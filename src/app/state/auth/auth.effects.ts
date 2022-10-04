import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../core/services/api.service';
import {makeAuthorization, makeAuthorizationFail, makeAuthorizationSuccess} from './auth.actions';
import {catchError, mergeMap, of, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {TotalSpinnerService} from '../../core/services/total-spinner.service';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private apiService: ApiService,
              private tss: TotalSpinnerService) {}

  /** Auth */
  makeAuthorization$ = createEffect(() => this.action$.pipe(
    ofType(makeAuthorization),
    tap(() => this.tss.show()),
    mergeMap((action) => this.apiService.login(action.email, action.password).pipe(
      map((authData) => {
        const user = {
          refreshToken: authData.user.refreshToken,
          email: authData.user.email,
          uid: authData.user.uid,
          displayName: authData.user.displayName
        };
        return makeAuthorizationSuccess({authData: user});
      }),
      catchError(error => of(makeAuthorizationFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));
}
