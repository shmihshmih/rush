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
  atoninSentences: IPrepositionExercise[];

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
      this.atoninSentences = atonins;
      console.log('this.atoninSentences: ', this.atoninSentences);
    });
  }


  nextExercise(): void {

  }

  showAnswer(): void {

  }

  openSettings(): void {

  }

  openHelp(): void {

  }
}
