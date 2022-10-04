import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectIsAuth} from './state/auth/auth.selectors';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {makeAuthorizationSuccess} from './state/auth/auth.actions';
import {take} from 'rxjs';
import {IUserAdmin} from './shared/models/main.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$ = this.store.select(selectIsAuth);
  constructor(private store: Store,
              private afAuth: AngularFireAuth) {

    // set auth if we have user in firebase token
    this.afAuth.authState
      .pipe(take(1))
      .subscribe(u => {
      if (u) {
        const user: IUserAdmin = {
          refreshToken: u.refreshToken,
          email: u.email,
          uid: u.uid,
          displayName: u.displayName
        };
        this.store.dispatch(makeAuthorizationSuccess({authData: user}));
      }
    });

  }
}
