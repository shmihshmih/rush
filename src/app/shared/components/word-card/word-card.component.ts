import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {forkJoin, Observable, Subject} from 'rxjs';
import {IWord} from '../../models/esperanto/word.interface';
import {MatDialog} from '@angular/material/dialog';
import {WordCardHelpComponent} from './popup/word-card-help/word-card-help.component';
import {WordCardSettingsComponent} from './popup/word-card-settings/word-card-settings.component';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  listWord: IWord[] = [];
  activeWordLists: string[] = [];
  isRepeat = false;
  startLang: 'russian' | 'english' | 'esperanto' = 'russian';
  finishLang: 'russian' | 'english' | 'esperanto' = 'esperanto';
  isShowAnswer = false;
  activeWord: Subject<IWord> = new Subject();

  // при нажатии на клавишу переключается слово
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      this.showAnswer();
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private esperantoService: EsperantoService,
              public dialog: MatDialog) {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        if (params.vortListo) {
          this.activeWordLists.push(params.vortListo);
          return this.esperantoService.getWordsByWordList(params.vortListo);
        }
      }),
      tap(words => {
        this.listWord = words;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.nextWord();
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

  nextWord(): void {
    this.isShowAnswer = false;
    if (this.listWord.length === 0) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * this.listWord.length);
    if (this.isRepeat) {
      this.activeWord.next(this.listWord[randomNumber]);
    } else {
      this.activeWord.next(this.listWord.splice(randomNumber, 1)[0]);
    }
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
        activeWordLists: this.activeWordLists,
        settings: {
          isRepeat: this.isRepeat,
          startLang: this.startLang,
          finishLang: this.finishLang
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

  setCardSettings(settings:
                    { isRepeat: boolean, startLang: 'russian' | 'english' | 'esperanto', finishLang: 'russian' | 'english' | 'esperanto' } =
                    {isRepeat: false, startLang: 'russian', finishLang: 'esperanto'},
                  wordLists = []): void {
    const allWordLists = [];
    this.listWord = [];
    this.activeWordLists = [];
    this.isRepeat = settings.isRepeat;
    this.startLang = settings.startLang;
    this.finishLang = settings.finishLang;
    wordLists.forEach(list => {
      allWordLists.push(this.esperantoService.getWordsByWordList(list.title));
      this.activeWordLists.push(list.title);
    });
    const allWordsFromAllLists: Observable<IWord[]> = forkJoin<IWord>([...allWordLists]);
    allWordsFromAllLists.subscribe((words: []) => words.forEach((list: IWord[]) => this.listWord.push(...list)));
  }
}
