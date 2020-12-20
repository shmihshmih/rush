import {DictionaryService} from './store/dictionary.service';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';
import {IListWord} from '../../../shared/models/esperanto/word_list.interface';
import {ApiService} from '../api.service';
import {switchMap, takeUntil} from 'rxjs/operators';

@Injectable()
export class EsperantoService implements OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private dictionaryService: DictionaryService,
    private apiService: ApiService
  ) {
  }

  /**
   * get all word lists
   */
  getWordLists(): Observable<IListWord[]> {
    return this.httpClient.get<IListWord[]>(`${this.apiService.MAIN_SERVER}esperanto/wordLists`);
  }

  /**
   * get all words from word list
   * @param wordList list we need
   */
  getWordsByWordList(wordList): Observable<IWord[]> {
    const params = {wordList};
    return this.httpClient.get<IWord[]>(`${this.apiService.MAIN_SERVER}esperanto/wordList`, {params});
  }

  /**
   * Добавление нового списка слов с проверкой авторизации
   * @param wordList название списка
   */
  addWordList(wordList): Observable<any> {
    const params = wordList;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.post(`${this.apiService.MAIN_SERVER}esperanto/wordList`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Удаление списка слов с проверкой авторизации
   * @param wordList название списка
   */
  delWordList(wordList): Observable<any> {
    const params = wordList._id;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.delete(`${this.apiService.MAIN_SERVER}esperanto/wordList`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Редактирование списка слов с проверкой авторизации
   * @param wordList название списка
   */
  updateWordList(wordList): Observable<any> {
    const params = wordList;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.put(`${this.apiService.MAIN_SERVER}esperanto/wordList`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Добавление нового слова с проверкой авторизации
   * @param word слово
   */
  addWord(word): Observable<any> {
    const params = word;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.post(`${this.apiService.MAIN_SERVER}esperanto/word`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Удаление слова с проверкой авторизации
   * @param word название списка
   */
  delWord(word): Observable<any> {
    const params = word._id;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.delete(`${this.apiService.MAIN_SERVER}esperanto/word`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Редактирование слова с проверкой авторизации
   * @param word название списка
   */
  updateWord(word): Observable<any> {
    const params = word;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.httpClient.put(`${this.apiService.MAIN_SERVER}esperanto/word`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  /**
   * Возвращает список необходимых слов по названию листа
   * @param q
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

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}

