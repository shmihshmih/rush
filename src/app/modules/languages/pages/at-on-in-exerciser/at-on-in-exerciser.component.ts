import {Component, OnInit} from '@angular/core';
import {IPrepositionExercise} from '../../../../shared/models/esperanto/at_on_in_sentence.interface';
import {Store} from '@ngrx/store';
import {selectAtOnInExercises} from '../../../../state/languages/words/words.selectors';
import {Observable} from 'rxjs';
import {loadAtOnInSentences, loadAtOnInSentencesByJson} from '../../../../state/languages/words/words.actions';
import {selectIsAuth} from '../../../../state/auth/auth.selectors';

@Component({
  selector: 'app-at-on-in-exerciser',
  templateUrl: './at-on-in-exerciser.component.html',
  styleUrls: ['./at-on-in-exerciser.component.scss']
})
export class AtOnInExerciserComponent implements OnInit {
  isAuth$ = this.store.select(selectIsAuth);

  atoninSentences$: Observable<IPrepositionExercise[]> = this.store.select(selectAtOnInExercises);
  atoninSentencesList: IPrepositionExercise[];

  isShowAnswer = false;

  isRepeat = false;

  activeExercise: IPrepositionExercise;

  constructor(private store: Store) {
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

    if (this.isRepeat) {
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

  }

  openHelp(): void {
    alert('Упражнение поможет выроботать использование at on in');
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * this.atoninSentencesList.length);
  }
}
