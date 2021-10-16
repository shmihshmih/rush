import {Component} from '@angular/core';
import {loadWordLists, loadWords} from './state/languages/words/words.actions';
import {Store} from '@ngrx/store';
import {setAuthDataFromLocalStorage} from './state/auth/auth.actions';
import {loadTasks} from './state/autoHR/autoHR.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store) {
    /** Загрузка данных для модуля с языками */
    // получение списков слов диспатч
    this.store.dispatch(loadWordLists());

    // получение слов
    this.store.dispatch(loadWords());

    // получение всех вопросов
    this.store.dispatch(loadTasks());

    // устанавливаем юзера из localStorage
    const authData = JSON.parse(localStorage.getItem('authData'));
    this.store.dispatch(setAuthDataFromLocalStorage({authData}));
  }
}
