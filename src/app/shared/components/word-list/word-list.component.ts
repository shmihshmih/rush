import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IWord} from '../../models/esperanto/word.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddWordComponent} from '../popup/add-word/add-word.component';
import {select, Store} from '@ngrx/store';
import {removeWord, setSelectedWordLists} from '../../../state/languages/words/words.actions';
import {selectWords, selectWordsFromSelectedLists} from '../../../state/languages/words/words.selectors';
import {selectIsAuth} from '../../../state/auth/auth.selectors';

/**
 * Компонент содержащий списки слов. Таблица.
 */
@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);
  unsubscribe$: Subject<boolean> = new Subject();

  displayedColumns: string[] = ['esperanto', 'english', 'russian'];
  dataSource: MatTableDataSource<IWord>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  words$: Observable<IWord[]>;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private store: Store) {

    // получаем список слов в зависимости от роута
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.loadListWords(params?.wordList);
    });

    // будем ли отображать админские функции
    this.isAuth$.subscribe(isAuth => {
      if (isAuth) {
        this.displayedColumns.push('actions');
      } else {
        this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
      }
    });
  }

  ngOnInit(): void {
    // подписываемся на список слов
    this.words$.subscribe((words) => {
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
      this.words$ = this.store.pipe(select(selectWords));
    } else {
      this.store.dispatch(setSelectedWordLists({selectedWordLists: [list]}));
      this.words$ = this.store.pipe(select(selectWordsFromSelectedLists));
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
    ).subscribe();
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
      this.store.dispatch(removeWord({deletedWord: word}));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
