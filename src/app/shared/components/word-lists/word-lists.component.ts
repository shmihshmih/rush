import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {Router} from '@angular/router';
import {ApiService} from '../../../core/services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {AddListComponent} from '../popup/add-list/add-list.component';
import {takeUntil} from 'rxjs/operators';
import {IWordList} from '../../models/esperanto/word_list.interface';
import {Store} from '@ngrx/store';
import {selectWordLists} from '../../../state/languages/words/words.selectors';
import {loadWordLists} from '../../../state/languages/words/words.actions';
import {selectIsAuth} from '../../../state/auth/auth.selectors';

@Component({
  selector: 'app-word-lists',
  templateUrl: './word-lists.component.html',
  styleUrls: ['./word-lists.component.scss']
})
export class WordListsComponent implements OnInit, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);
  unsubscribe$: Subject<boolean> = new Subject();
  mode: 'russian' | 'english' | 'esperanto' = 'english';

  public vortlistoj$: Observable<IWordList[]> = this.store.select(selectWordLists);

  constructor(
    public esperantoService: EsperantoService,
    private router: Router,
    public apiService: ApiService,
    public dialog: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit(): void {
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
  }

  openListWord(title: string): void {
    this.router.navigate([this.mode, this.mode === 'esperanto' ? 'vortlisto' : 'wordList', title]);
  }

  openCardExercise(title: string): void {
    this.router.navigate([this.mode, this.mode === 'esperanto' ? 'vortokarto' : 'wordCard', title]);
  }

  addList(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
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
        this.store.dispatch(loadWordLists());
      }
    });
  }

  updateWordList(wordList): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      panelClass: ['of-auto'],
      data: {wordList}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result.item) {
        this.store.dispatch(loadWordLists());
      }
    });
  }

  delWordList(vortListo: IWordList): void {
    const areYouSure = confirm('Точно удалить список?');
    if (areYouSure) {
      this.esperantoService.delWordList(vortListo).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
        if (res.item) {
          this.store.dispatch(loadWordLists());
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
