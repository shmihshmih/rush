import {IWord} from '../../../shared/models/esperanto/word.interface';
import {from, mergeMap, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';
import {ApiService} from '../api.service';
import {map} from 'rxjs/operators';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';
import {Store} from '@ngrx/store';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {IPrepositionExercise} from '../../../shared/models/esperanto/at_on_in_sentence.interface';

@Injectable()
export class EsperantoService implements OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private store: Store,
    private readonly afs: AngularFirestore
  ) {
  }

  /** Списки слов */

  /** get all word lists */
  getWordLists(): Observable<IWordList[]> {
    const wordListsCollection: AngularFirestoreCollection<IWordList> = this.afs.collection<IWordList>('wordLists');
    return wordListsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IWordList;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  /** get word lists by JSON */
  getWordListsByJSON(): Observable<IWordList[]> {
    return this.httpClient.get<IWordList[]>(`./assets/collections/wordlistmodels.json`);
  }

  /**
   * Добавление нового списка слов с проверкой авторизации
   * @param wordList название списка
   */
  addWordList(wordList): Observable<IWordList> {
    const wordLists = this.afs.collection<IWordList>('wordLists');
    const id = this.afs.createId();
    const params = {...wordList, id};
    return from(wordLists.doc(id).set({...params})).pipe(
      mergeMap((res) => {
        return of({...params});
      })
    );
  }

  /**
   * Удаление списка слов с проверкой авторизации
   * @param wordList название списка
   */
  delWordList(wordList): Observable<any> {
    const wordListsCollection = this.afs.collection('wordLists');
    return from(wordListsCollection.doc(wordList.id).delete());
  }

  /**
   * Редактирование списка слов с проверкой авторизации
   * @param wordList название списка
   */
  updateWordList(wordList): Observable<any> {
    const wordLists = this.afs.collection<IWordList>('wordLists');
    return from(wordLists.doc(wordList.id).update({...wordList})).pipe(
      mergeMap((res) => {
        return of({...wordList});
      })
    );
  }

  /** Слова */
  /**
   * get all words from word list
   * @param wordList list we need
   */
  getWordsByWordList(wordList?: string[]): Observable<IWord[]> {
    const wordsCollection: AngularFirestoreCollection<IWord> = this.afs.collection<IWord>('words', ref => ref.where('word_type', 'array-contains-any', wordList));
    return wordsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IWord;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  /**
   * get all words from word list by JSON
   * @param wordList list we need
   */
  getWordsByWordListByJSON(wordList?: string[]): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>(`./assets/collections/wordmodels.json`)
      .pipe(
        map((res) => {
          let wordsByWordList = [];
          if (wordList) {
            wordsByWordList = res.filter(word => (word.word_type === wordList) || word.word_type.some(type => wordList.includes(type)));
          } else {
            wordsByWordList = res;
          }
          return wordsByWordList;
        })
      );
  }

  /**
   * Добавление нового слова с проверкой авторизации
   * @param word слово
   */
  addWord(word): Observable<any> {
    const wordsCollection = this.afs.collection<IWord>('words');
    const id = this.afs.createId();
    const params = {...word, id};
    return from(wordsCollection.doc(id).set({...params})).pipe(
      mergeMap((res) => {
        return of({...params});
      })
    );
  }

  /**
   * Удаление слова с проверкой авторизации
   * @param word название списка
   */
  delWord(word): Observable<any> {
    const wordCollection = this.afs.collection('words');
    return from(wordCollection.doc(word.id).delete());
  }

  /**
   * Редактирование слова с проверкой авторизации
   * @param word название списка
   */
  updateWord(word): Observable<any> {
    const wordsCollection = this.afs.collection<IWord>('words');
    return from(wordsCollection.doc(word.id).update({...word})).pipe(
      mergeMap((res) => {
        return of({...word});
      })
    );
  }

  /** get all words @deprecated */
  // getWords(): Observable<IWord[]> {
  //   return this.httpClient.get<IWord[]>(`${this.apiService.MAIN_SERVER}esperanto/allWords`);
  // }
  getWords(): Observable<IWord[]> {
    const wordsCollection: AngularFirestoreCollection<IWord> = this.afs.collection<IWord>('words', ref => ref.where('word_type', 'array-contains', 'numeraloj'));
    let words: Observable<IWord[]>;
    words = wordsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IWord;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return words;
  }

  /**
   * Снять все слова дамп
   */
  getAllWordsForDump(): Observable<IWord[]> {
    const wordsCollection: AngularFirestoreCollection<IWord> = this.afs.collection<IWord>('words');
    let words: Observable<IWord[]>;
    words = wordsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IWord;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return words;
  }

  /**
   * get all words from JSON
   */
  getWordsByJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>(`./assets/collections/wordmodels.json`);
  }

  /**
   * Возвращает список необходимых слов по названию листа
   * @param q название документа
   */
  public getWordsFromJSON(q: string): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>(`./assets/esperanto/_${q}.json`);
  }

  /**
   * radiko de la vorto
   * Take root (ПОлучает корень слова)
   * @param type string
   * @param word string
   */
  public makeRoot(type: string, word: string): string {
    switch (type) {
      case 'infinitiveVerb':
        return word.toLowerCase().slice(0, -1);
    }
  }

  /**
   * preterito verbo
   * Create past verb using + is to root (Создает глагол прошедшего воемени путем добавления к корню is)
   * @param verb string
   */
  public makePastVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'is';
  }

  /**
   * nuna verbo
   * Create present verb using + as to root (Создает глагол настоящего воемени путем добавления к корню as)
   * @param verb string
   */
  public makePresentVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'as';
  }

  /**
   * estonta verbo
   * Create future verb using + os to root (Создает глагол будущего воемени путем добавления к корню os)
   * @param verb string
   */
  public makeFutureVerb(verb: string): string {
    return this.makeRoot('infinitiveVerb', verb) + 'os';
  }

  /**
   * infinitivo
   * Create infinitive verb by adding i to root (Создаем инфинитив глагола путем добавления к корню i)
   * @param root string
   */
  public makeInfinitiveVerb(root: string): string {
    return root + 'i';
  }

  /**
   * adjektivo
   * Create an adjective by adding a to root (Создаем прилагательное добавлением a к корню)
   * @param root string
   */
  public makeAdjective(root: string): string {
    return root + 'a';
  }

  /**
   * adverbo
   * Create an adverb by adding e to root (Создаем наречие добавлением e к корню)
   * @param root string
   */
  public makeAdverb(root: string): string {
    return root + 'e';
  }

  /**
   * substantivo
   * Create a noun by adding a to the root (Создаем существительное добавлением o к корню)
   * @param root string
   */
  public makeNoun(root: string): string {
    return root + 'o';
  }

  /** at on in generator */

  /** get all atonin sentences */
  getAtOnInSentences(): Observable<IPrepositionExercise[]> {
    const atOnInSentencesCollection: AngularFirestoreCollection<IPrepositionExercise> = this.afs.collection<IPrepositionExercise>('atOnInSentences');
    return atOnInSentencesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IPrepositionExercise;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  /** get all atonin sentences by JSON */
  getAtOnInSentencesByJSON(): Observable<IPrepositionExercise[]> {
    return this.httpClient.get<IPrepositionExercise[]>(`./assets/collections/atoninprepositionsmodels.json`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
