import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../core/services/api.service';
import {makeAuthorization, makeAuthorizationFail, makeAuthorizationSuccess} from './auth.actions';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private apiService: ApiService,
              private store: Store) {
  }

  /** Авторизация */
  makeAuthorization$ = createEffect(() => this.action$.pipe(
    ofType(makeAuthorization),
    mergeMap((action) => this.apiService.login(action.email, action.password).pipe(
      map(authData => {
        const user = {
          refreshToken: authData.user.refreshToken,
          email: authData.user.email,
          uid: authData.user.uid,
          displayName: authData.user.displayName
        };
        return makeAuthorizationSuccess({authData: user});
      }),
      catchError(error => of(makeAuthorizationFail({error: error.toString()})))
    ))
  ));

  /** Проверка авторизован ли юзер */
  // checkAuth$ = createEffect(() => this.action$.pipe(
  //   ofType(checkAuth),
  //   mergeMap((action) => this.apiService.checkAuth().pipe(
  //     map(authData => {
  //       if (authData) {
  //         const user = {
  //           refreshToken: authData.refreshToken,
  //           email: authData.email,
  //           uid: authData.uid,
  //           displayName: authData.displayName
  //         };
  //         return checkAuthSuccess({authData: user});
  //       } else {
  //         return checkAuthSuccess({authData: initialUserState});
  //       }
  //     }),
  //     catchError(error => {
  //       return of(checkAuthFail({error: error.toString()}));
  //     })
  //   )),
  //   tap((q) => {
  //     // @ts-ignore
  //     if (!!q.authData.uid) {
  //       // получение всех списков слов
  //       this.store.dispatch(loadWordLists());
  //
  //       // получение всех слов
  //       this.store.dispatch(loadWords());
  //
  //       // получение всех вопросов
  //       this.store.dispatch(loadTasks());
  //
  //       // справочники autoHR
  //       this.store.dispatch(loadDifficultyCatalog());
  //       this.store.dispatch(loadCompetenceCatalog());
  //       this.store.dispatch(loadPopularityCatalog());
  //     } else {
  //       this.store.dispatch(loadWordListsByJSON());
  //
  //       this.store.dispatch(loadWordsByJSON());
  //     }
  //   })
  // ));

  /** Логаут */
  // logout = createEffect(() => this.action$.pipe(
  //   ofType(logout),
  //   mergeMap((action) => this.apiService.logout().pipe(
  //     map(() => logoutSuccess()),
  //     catchError(error => of(logoutFail({error: error.toString()})))
  //   ))
  // ));

}
