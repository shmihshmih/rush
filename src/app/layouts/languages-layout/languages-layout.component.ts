import { Component, OnInit } from '@angular/core';
import {checkAuthFail, checkAuthSuccess} from '../../state/auth/auth.actions';
import {initialUserState} from '../../state/auth/auth.reducer';
import {loadWordLists, loadWordListsByJSON, loadWords, loadWordsByJSON} from '../../state/languages/words/words.actions';
import {of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Store} from '@ngrx/store';
import {IUserAdmin} from '../../shared/models/main.interface';

@Component({
  selector: 'app-languages-layout',
  templateUrl: './languages-layout.component.html',
  styleUrls: ['./languages-layout.component.scss']
})
export class LanguagesLayoutComponent implements OnInit {
  public user: IUserAdmin;

  constructor(private afAuth: AngularFireAuth,
              private store: Store) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(): void {
    this.afAuth.onAuthStateChanged(
      (authData) => {
        if (authData) {
          const user = {
            refreshToken: authData.refreshToken,
            email: authData.email,
            uid: authData.uid,
            displayName: authData.displayName
          };
          this.user = user;
          this.store.dispatch(checkAuthSuccess({authData: user}));
        } else {
          this.user = null;
          this.store.dispatch(checkAuthSuccess({authData: initialUserState}));
        }

        if (!!this.user?.uid) {
          // получение всех списков слов
          this.store.dispatch(loadWordLists());

          // получение всех слов
          this.store.dispatch(loadWords());
        } else {
          // получение всех списков слов
          this.store.dispatch(loadWordListsByJSON());

          // получение всех слов
          this.store.dispatch(loadWordsByJSON());
        }
      },
      error => {
        return of(checkAuthFail({error: error.toString()}));
      },
      () => {

      });
  }

}
