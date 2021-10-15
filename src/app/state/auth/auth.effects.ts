import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../core/services/api.service';
import {makeAuthorization, makeAuthorizationFail, makeAuthorizationSuccess} from './auth.actions';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private apiService: ApiService) {
  }

  /** Авторизация */
  makeAuthorization$ = createEffect(() => this.action$.pipe(
    ofType(makeAuthorization),
    mergeMap(() => this.apiService.login().pipe(
      map(authData => {
        return makeAuthorizationSuccess({authData});
      }),
      catchError(error => of(makeAuthorizationFail({error})))
    ))
  ));
}
