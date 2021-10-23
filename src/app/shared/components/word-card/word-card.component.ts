import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {WordCardHelpComponent} from './popup/word-card-help/word-card-help.component';
import {WordCardSettingsComponent} from './popup/word-card-settings/word-card-settings.component';
import {IWord} from '../../models/esperanto/word.interface';
import {Store} from '@ngrx/store';
import {clearSelectedWordLists, setSelectedWordLists} from '../../../state/languages/words/words.actions';
import {selectSelectedWordLists, selectWordsFromSelectedLists} from '../../../state/languages/words/words.selectors';
import {IWordList} from '../../models/esperanto/word_list.interface';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  listWord$: Observable<IWord[]> = this.store.select(selectWordsFromSelectedLists);
  listWord: IWord[] = [];
  activeWordLists$: Observable<string[]> = this.store.select(selectSelectedWordLists);
  isRepeat = false;
  startLang: 'russian' | 'english' | 'esperanto' = 'russian';
  finishLang: 'russian' | 'english' | 'esperanto' = 'esperanto';
  isShowAnswer = false;
  isAuto = false;
  timer = null;
  wordInterval = null;
  activeWord: IWord;

  // при нажатии на клавишу переключается слово
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      this.showAnswer();
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private esperantoService: EsperantoService,
              public dialog: MatDialog,
              private router: Router,
              private store: Store) {

    // получаем мод, для конечного языка
    this.finishLang = this.router.url.split('/')[1] as 'russian' | 'english' | 'esperanto';

    // получаем список для загрузки
    this.activatedRoute.params.pipe(
      tap(params => {
        if (params.wordList) {
          this.store.dispatch(setSelectedWordLists({selectedWordLists: [params.wordList]}));
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
    });
  }

  ngOnInit(): void {
    this.listWord$.subscribe(words => {
      this.listWord = words;
      this.nextWord();
    });
  }


  nextWord(): void {
    this.isShowAnswer = false;
    this.activeWord = null;
    if (this.listWord.length === 0) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * this.listWord.length);
    if (this.isRepeat) {
      this.activeWord = this.listWord[randomNumber];
    } else {
      this.activeWord = this.listWord.splice(randomNumber, 1)[0];
    }
  }

  showAnswer(): void {
    if (this.isShowAnswer === true) {
      this.isShowAnswer = false;
      this.nextWord();
    } else {
      this.isShowAnswer = true;
      console.log('check');
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
