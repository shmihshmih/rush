import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
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
  listWord$: Observable<IWord[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private esperantoService: EsperantoService,
              public dialog: MatDialog) {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      if (params.vortListo) {
        this.loadListWords(params.vortListo);
      }
    });
  }

  ngOnInit(): void {
  }

  loadListWords(list: string): void {
    if (!list) {
      return;
    }
    this.esperantoService.getListWordFromJSON(list).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((words: IWord[]) => {
      console.log('words: ', words);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

  nextWord(): void {

  }

  showAnswer(): void {

  }

  openSettings(): void {
    const dialogRef = this.dialog.open(WordCardSettingsComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openHelp(): void {
    const dialogRef = this.dialog.open(WordCardHelpComponent, {
      width: '500px',
      data: {text: 'Второе упражнение создано для тренировки слов. В строке "Дано" указывается то, что спрашивается. В строке "Ответ" - правильный вариант. В настройках можно выбрать списки слов, которые будут использованы в упражнении. Можно выбрать будут ли повторяться слова. Можно выбрать будет ли проверяться русский или английский перевод. Приятной тренировки! Для критики, пожеланий, предложений: shmihshmih@gmail.com '}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
