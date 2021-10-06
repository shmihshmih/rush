import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {IWord} from '../../models/esperanto/word.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../../core/services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {AddWordComponent} from '../popup/add-word/add-word.component';
import {select, Store} from '@ngrx/store';
import {selectWords} from '../../../state/languages/words.selectors';
import {getAllWords} from '../../../state/languages/words.actions';

/**
 * Компоннет содержащий списки слов. Таблица.
 */
@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();

  displayedColumns: string[] = ['esperanto', 'english', 'russian'];
  dataSource: MatTableDataSource<IWord>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  words$ = this.store.pipe(select(selectWords));

  constructor(private activatedRoute: ActivatedRoute,
              private esperantoService: EsperantoService,
              public apiService: ApiService,
              public dialog: MatDialog,
              private store: Store) {

    // получаем список слов в зависимости от роута
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.loadListWords(params?.wordList);
    });

    // будем ли отображать админские функции
    this.apiService.isAuth.subscribe(isAuth => {
      if (isAuth) {
        this.displayedColumns.push('actions');
      } else {
        this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
      }
    });
  }

  ngOnInit(): void {
    // подписываемся на список слов
    this.words$.subscribe((words: IWord[]) => {
      if (words) {
        this.dataSource = new MatTableDataSource(words);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  /**
   * Загрузить необходимый список слов. Либо все слова, если списка нет.
   * @param list string
   */
  loadListWords(list: string): void {
    if (!list) {
      this.esperantoService.getWords().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(words => {
        this.store.dispatch(getAllWords());
      });
    } else {
      this.esperantoService.getWordsByWordList(list).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((words: IWord[]) => {
        this.store.dispatch(getAllWords());
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Добавить новое слово
   */
  addWord(): void {
    const dialogRef = this.dialog.open(AddWordComponent, {
      panelClass: ['of-auto'],
      data: {}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result.item) {
        // TODO в будущем не перезагружать и работать со списком, который уже вызван
        this.loadListWords(result.item.params.word_type);
      }
    });
  }

  /**
   * обновить слово
   * @param word IWord
   */
  updateWord(word): void {
    const dialogRef = this.dialog.open(AddWordComponent, {
      panelClass: ['of-auto'],
      data: {word}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result.item) {
        // TODO в будущем не перезагружать и работать со списком, который уже вызван
        this.loadListWords(result.item.params.word_type);
      }
    });
  }

  /**
   * Удалить слово
   * @param word IWord
   */
  delWord(word: IWord): void {
    const areYouSure = confirm('Точно удалить слово?');
    if (areYouSure) {
      this.esperantoService.delWord(word).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
        if (res.item) {
          // TODO в будущем не перезагружать и работать со списком, который уже вызван
          // this.loadListWords(word.word_type);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
