import {Component} from '@angular/core';
import {loadWordLists, loadWords} from './state/languages/words/words.actions';
import {Store} from '@ngrx/store';
import {checkAuth} from './state/auth/auth.actions';
import {loadCompetenceCatalog, loadDifficultyCatalog, loadPopularityCatalog, loadTasks} from './state/autoHR/autoHR.actions';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  item$: Observable<any[]>;

  constructor(private store: Store, firestore: Firestore) {

    const words = collection(firestore, 'words');
    this.item$ = collectionData(words);

    this.item$.subscribe(w => console.log('collectionData(words): ', w));

    /** Загрузка данных для модуля с языками */
    // получение списков слов диспатч
    this.store.dispatch(loadWordLists());

    // получение слов
    this.store.dispatch(loadWords());

    // получение всех вопросов
    this.store.dispatch(loadTasks());
    // справочники autoHR
    this.store.dispatch(loadDifficultyCatalog());
    this.store.dispatch(loadCompetenceCatalog());
    this.store.dispatch(loadPopularityCatalog());

    // проверяем автризован ли
    this.store.dispatch(checkAuth());

    // устанавливаем юзера из localStorage
    // const authData = JSON.parse(localStorage.getItem('authData'));
    // this.store.dispatch(setAuthDataFromLocalStorage({authData}));

  }
}
