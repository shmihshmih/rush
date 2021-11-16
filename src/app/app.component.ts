import {Component} from '@angular/core';
import {loadWordLists, loadWords} from './state/languages/words/words.actions';
import {Store} from '@ngrx/store';
import {checkAuth} from './state/auth/auth.actions';
import {loadCompetenceCatalog, loadDifficultyCatalog, loadPopularityCatalog, loadTasks} from './state/autoHR/autoHR.actions';
import {selectIsAuth} from './state/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store,
  ) {

    // проверяем авторизацию
    this.store.dispatch(checkAuth());

    this.isAuth$.subscribe(isAuth => {
      if (!isAuth) { // если не авториован, прогружаем все из родных джейсонов
        // получение всех списков слов
        this.store.dispatch(loadWordLists());

        // получение всех слов
        this.store.dispatch(loadWords());

        // получение всех вопросов
        this.store.dispatch(loadTasks());

        // справочники autoHR
        this.store.dispatch(loadDifficultyCatalog());
        this.store.dispatch(loadCompetenceCatalog());
        this.store.dispatch(loadPopularityCatalog());
      } else { // если авториован, грузим уже из базы
        // грузим уже в модулях и на местах, где это нужно
      }
    });
  }
}
