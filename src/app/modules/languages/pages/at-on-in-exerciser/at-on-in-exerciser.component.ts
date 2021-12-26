import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPrepositionExercise} from '../../../../shared/models/esperanto/at_on_in_sentence.interface';
import {Store} from '@ngrx/store';
import {selectAtOnInExercises} from '../../../../state/languages/words/words.selectors';
import {Observable, Subject} from 'rxjs';
import {loadAtOnInSentences, loadAtOnInSentencesByJson} from '../../../../state/languages/words/words.actions';
import {selectIsAuth} from '../../../../state/auth/auth.selectors';
import {takeUntil} from 'rxjs/operators';
import {AtOnInSettingsPopupComponent} from '../../components/at-on-in-settings-popup/at-on-in-settings-popup.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-at-on-in-exerciser',
  templateUrl: './at-on-in-exerciser.component.html',
  styleUrls: ['./at-on-in-exerciser.component.scss']
})
export class AtOnInExerciserComponent implements OnInit, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);

  atoninSentences$: Observable<IPrepositionExercise[]> = this.store.select(selectAtOnInExercises);
  atoninSentencesList: IPrepositionExercise[];

  isShowAnswer = false;

  activeExercise: IPrepositionExercise;

  config = {
    isRepeat: false,
    timer: null,
    isAuto: false
  };

  unsubscribe$: Subject<boolean> = new Subject();

  exerciseInterval = null;

  constructor(private store: Store,
              public dialog: MatDialog) {
    this.isAuth$.pipe().subscribe((isAuth) => {
      if (isAuth) {
        this.store.dispatch(loadAtOnInSentences());
      } else {
        this.store.dispatch(loadAtOnInSentencesByJson());
      }
    });
  }

  ngOnInit(): void {
    this.atoninSentences$.subscribe(atonins => {
      this.atoninSentencesList = [...atonins];
      this.nextExercise();
    });
  }


  nextExercise(): void {
    this.isShowAnswer = false;

    if (this.atoninSentencesList.length === 0) {
      return;
    }

    let randomNumber = this.getRandomNumber();

    if (this.config.isRepeat) {
      // если предыдущее слово равняется новому, то берем новое
      if (this.activeExercise.id === this.atoninSentencesList[randomNumber].id) {
        randomNumber = this.getRandomNumber();
      }

      this.activeExercise = this.atoninSentencesList[randomNumber];
    } else {
      this.activeExercise = this.atoninSentencesList.splice(randomNumber, 1)[0];
    }
  }

  showAnswer(): void {
    if (this.isShowAnswer === true) {
      this.isShowAnswer = false;
      this.nextExercise();
    } else {
      this.isShowAnswer = true;
    }
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(AtOnInSettingsPopupComponent, {
      panelClass: ['of-auto'],
      data: {config: this.config}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result) {
        this.config = result.config;
        this.setExerciseInterval();
      }
    });
  }

  openHelp(): void {
    alert('Упражнение поможет выработать использование at on in');
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * this.atoninSentencesList.length);
  }

  setExerciseInterval(): void {
    clearInterval(this.exerciseInterval);
    if (this.config.isAuto) {
      this.exerciseInterval = setInterval(() => {
        this.showAnswer();
      }, this.config.timer);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
