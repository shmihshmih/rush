import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadActiveQuestBook,
  loadActiveQuestBookFail,
  loadActiveQuestBookSuccess,
  loadQuestBooks,
  loadQuestBooksFail,
  loadQuestBooksSuccess
} from './blog.actions';
import {BlogService} from '../../core/services/blog/blog.service';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {IQuestBook, IQuestBookPart} from '../../shared/models/blog/questBook.model';

@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions,
              private blogService: BlogService) {
  }

  /** Получение списка книжных квестов */
  loadQuestBooks$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuestBooks),
    mergeMap(() => this.blogService.getBookQuestList().pipe(
      map((questBooks: IQuestBook[]) => loadQuestBooksSuccess({questBooks})),
      catchError((error) => of(loadQuestBooksFail({error})))
    ))
  ));

  /** Получения активной книги квестов */
  loadActiveQuestBook$ = createEffect(() => this.actions$.pipe(
    ofType(loadActiveQuestBook),
    mergeMap((action) =>
      this.blogService.getQuestBookByCollectionCaption(action.activeQuestBookCollectionCaption).pipe(
        map((activeQuestBook: IQuestBookPart[]) => loadActiveQuestBookSuccess({
          collection_caption: action.activeQuestBookCollectionCaption,
          dataCollection: activeQuestBook,
          selectedPart: activeQuestBook[0]
        })),
        catchError((error) => of(loadActiveQuestBookFail({error})))
      )
    )
  ));
}
