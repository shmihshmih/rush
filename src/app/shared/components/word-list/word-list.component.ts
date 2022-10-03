import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, Observable, of, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IWord} from '../../models/esperanto/word.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddWordComponent} from '../popup/add-word/add-word.component';
import {select, Store} from '@ngrx/store';
import {removeWord, setSelectedWordLists, setSelectedWordListsByJSON, updateWord} from '../../../state/languages/words/words.actions';
import {selectWords, selectWordsFromSelectedLists} from '../../../state/languages/words/words.selectors';
import {selectIsAuth} from '../../../state/auth/auth.selectors';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {ApiService} from '../../../core/services/api.service';

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

  mode: 'russian' | 'english' | 'esperanto' = 'english';

  collectionCaption: string;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private store: Store,
              private esperantoService: EsperantoService,
              private apiService: ApiService,
              private router: Router) {


    // будем ли отображать админские функции
    this.isAuth$.pipe(
      concatMap(isAuth => {
        if (isAuth) {
          this.displayedColumns.push('actions');
        } else {
          this.displayedColumns = this.displayedColumns.filter(col => col !== 'actions');
        }
        return of(isAuth);
      })
    ).subscribe(
      (isAuth) => {
        // получаем список слов в зависимости от роута
        this.activatedRoute.params.pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(params => {
          this.loadListWords(params?.wordList, isAuth);
        });
      }
    );
  }

  ngOnInit(): void {
    // подписываемся на список слов
    this.words$.subscribe((words) => {
      if (words) {
        this.setWordsOnTheTable(words);
      }
    });

    switch (this.router.url.split('/')[1]) {
      case 'russian' :
        this.mode = 'russian';
        break;
      case 'esperanto':
        this.mode = 'esperanto';
        break;
      case 'english':
        this.mode = 'english';
        break;
    }

    this.collectionCaption = this.router.url.split('/')[3];
  }

  setWordsOnTheTable(words): void {
    this.dataSource = new MatTableDataSource(words);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Загрузить необходимый список слов. Либо все слова, если списка нет.
   * @param list string
   * @param isAuth boolean
   */
  loadListWords(list: string, isAuth: boolean): void {
    if (!list) {
      this.words$ = this.store.pipe(select(selectWords));
    } else {
      this.words$ = this.store.pipe(select(selectWordsFromSelectedLists));
      if (isAuth) {
        this.store.dispatch(setSelectedWordLists({selectedWordLists: [list]}));
      } else {
        this.store.dispatch(setSelectedWordListsByJSON({selectedWordLists: [list]}));
      }
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
   * @param isAuth boolean
   */
  updateWord(word, isAuth: boolean): void {
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
        this.store.dispatch(updateWord(result.item));
        // TODO в будущем не перезагружать и работать со списком, который уже вызван
        this.loadListWords(result.item.params.word_type, isAuth);
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

  /** Снять дамп всех слов */
  dumpWords(): void {
    const isDump = confirm('Точно снять дамп всех слов? Это тяжелая операция');
    if (isDump) {
      this.esperantoService.getAllWordsForDump().subscribe(words => {
        this.apiService.downloadObjectAsJson(words, `words dump ${new Date()}`);
      });
    }
  }

  openCardExercise(title: string): void {
    this.router.navigate(['languages', 'wordCard', title]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
