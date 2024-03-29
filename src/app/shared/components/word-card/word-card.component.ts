import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {concatMap, Observable, of, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {WordCardHelpComponent} from './popup/word-card-help/word-card-help.component';
import {WordCardSettingsComponent} from './popup/word-card-settings/word-card-settings.component';
import {IWord} from '../../models/esperanto/word.interface';
import {Store} from '@ngrx/store';
import {
  clearSelectedWordLists,
  clearWords,
  setSelectedWordLists,
  setSelectedWordListsByJSON
} from '../../../state/languages/words/words.actions';
import {selectWordsFromSelectedLists} from '../../../state/languages/words/words.selectors';
import {IWordList} from '../../models/esperanto/word_list.interface';
import {selectIsAuth} from '../../../state/auth/auth.selectors';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);

  unsubscribe$: Subject<boolean> = new Subject();

  listWord$: Observable<IWord[]> = this.store.select(selectWordsFromSelectedLists);
  listWord: IWord[] = [];

  // config
  isRepeat = false;
  startLang: 'russian' | 'english' | 'esperanto' = 'russian';
  finishLang: 'russian' | 'english' | 'esperanto' = 'english';
  isShowAnswer = false;
  isAuto = false;
  timer = null;
  wordInterval = null;

  activeWord: IWord;

  // при нажатии на клавишу переключается слово
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if ((event.key === 'ArrowRight') || (event.key === ' ')) {
      this.showAnswer();
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private store: Store) {

    this.isAuth$.pipe(
      concatMap(isAuth => {
        return this.activatedRoute.params.pipe(
          switchMap((params) => {
            return of({isAuth, params});
          }),
          takeUntil(this.unsubscribe$)
        );
      }),
      tap(data => {
        if (data.params.wordList) {
          if (data.isAuth) {
            this.store.dispatch(setSelectedWordLists({selectedWordLists: [data.params.wordList]}));
          } else {
            this.store.dispatch(setSelectedWordListsByJSON({selectedWordLists: [data.params.wordList]}));
          }
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnInit(): void {
    this.listWord$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(words => {
      this.listWord = words;
      this.nextWord();
    });
  }

  nextWord(): void {
    this.isShowAnswer = false;
    if (this.listWord.length === 0) {
      return;
    }

    let randomNumber = this.getRandomNumber();
    if (this.isRepeat) {
      // если предыдущее слово равняется новому, то берем новое
      if (this.activeWord.english === this.listWord[randomNumber].english
        && this.activeWord.esperanto === this.listWord[randomNumber].esperanto
        && this.activeWord.russian === this.listWord[randomNumber].russian) {
        randomNumber = this.getRandomNumber();
      }

      this.activeWord = this.listWord[randomNumber];
    } else {
      this.activeWord = this.listWord.splice(randomNumber, 1)[0];
    }
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * this.listWord.length);
  }

  showAnswer(): void {
    if (this.isShowAnswer === true) {
      this.isShowAnswer = false;
      this.nextWord();
    } else {
      this.isShowAnswer = true;
    }
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(WordCardSettingsComponent, {
      panelClass: ['wordCardSettingsPopup'],
      data: {
        settings: {
          isRepeat: this.isRepeat,
          startLang: this.startLang,
          finishLang: this.finishLang,
          isAuto: this.isAuto,
          timer: this.timer
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.setCardSettings(result.settings, result.wordLists);
    });
  }

  openHelp(): void {
    const dialogRef = this.dialog.open(WordCardHelpComponent, {
      width: '500px',
      data: {text: 'Второе упражнение создано для тренировки слов. В строке "Дано" указывается то, что спрашивается. В строке "Ответ" - правильный вариант. В настройках можно выбрать списки слов, которые будут использованы в упражнении. Можно выбрать будут ли повторяться слова. Можно выбрать будет ли проверяться русский или английский перевод. Приятной тренировки! Для критики, пожеланий, предложений: shmihshmih@gmail.com '}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  setCardSettings(
    settings: ISettings = {isRepeat: false, startLang: 'russian', finishLang: 'esperanto', isAuto: false, timer: null},
    wordLists: IWordList[]): void {
    const activeWordLists: string[] = [];
    this.isRepeat = settings.isRepeat;
    this.startLang = settings.startLang;
    this.finishLang = settings.finishLang;
    this.isAuto = settings.isAuto;
    this.timer = settings.timer;
    wordLists.forEach(list => {
      activeWordLists.push(list.collection_caption);
    });
    this.store.dispatch(setSelectedWordLists({selectedWordLists: [...activeWordLists]}));
    this.setWordInterval();
  }

  setWordInterval(): void {
    clearInterval(this.wordInterval);
    if (this.isAuto) {
      this.wordInterval = setInterval(() => {
        this.showAnswer();
      }, this.timer);
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSelectedWordLists());
    this.store.dispatch(clearWords());
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}

export interface ISettings {
  isRepeat: boolean;
  startLang: 'russian' | 'english' | 'esperanto';
  finishLang: 'russian' | 'english' | 'esperanto';
  isAuto: boolean;
  timer: number;
}
