import {Component} from '@angular/core';
import {loadWordLists, loadWords} from './state/languages/words/words.actions';
import {Store} from '@ngrx/store';
import {checkAuth} from './state/auth/auth.actions';
import {loadCompetenceCatalog, loadDifficultyCatalog, loadPopularityCatalog, loadTasks} from './state/autoHR/autoHR.actions';
import {Firestore} from '@angular/fire/firestore';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {IWord} from './shared/models/esperanto/word.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // private aqb$ = this.store.select(selectActiveQuestBook);

  // item$: Observable<any[]>;

  // words = collection(this.firestore, 'words');

  private itemsCollection: AngularFirestoreCollection<IWord>;

  constructor(private store: Store,
              private firestore: Firestore,
              private readonly afs: AngularFirestore) {

    // const words = collection(firestore, 'words');
    // this.item$ = collectionData(words);
    // this.item$.subscribe(w => console.log('collectionData(words): ', w));

    /** Загрузка данных для модуля с языками */
    // получение списков слов диспатчей
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

  // goResolve(): void {
  //
  //   let aqb$In = [];
  //
  //   this.aqb$.subscribe(a => {
  //     aqb$In = a.dataCollection;
  //   });
  //
  //   aqb$In.forEach(tsk => {
  //
  //     this.itemsCollection = this.afs.collection<IWord>('theStainlessSteelRat');
  //     const id = this.afs.createId();
  //
  //     const task = {...tsk, _id: {$oid: id}};
  //
  //     this.itemsCollection.doc(id).set(task);
  //
  //   });


  // const wordToWrite = {
  //   _id: {
  //     $oid: '5fdb39d9de8a0736d4092bef'
  //   },
  //   id,
  //   word_type: [
  //     'adjektivoj'
  //   ],
  //   esperanto: 'malbona2',
  //   english: 'bad2',
  //   russian: 'плохой2'
  // };

  // this.itemsCollection.doc(id).set(wordToWrite);
// }
}
