import {EsperantoService} from '../../../../core/services/esperanto/esperanto.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IListWord} from '../../../../shared/models/esperanto/word_list.interface';
import {Router} from '@angular/router';
import {ApiService} from '../../../../core/services/api.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {AddListComponent} from '../../../../shared/components/popup/add-list/add-list.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  vortlistoj$: Observable<IListWord[]>;

  constructor(
    public esperantoService: EsperantoService,
    private router: Router,
    public apiService: ApiService,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.vortlistoj$ = this.esperantoService.getWordLists();
  }

  openListWord(title: string): void {
    this.router.navigate(['esperanto', 'vortlisto', title]);
  }

  openCardExercise(title: string): void {
    this.router.navigate(['esperanto', 'vortokarto', title]);
  }

  addList(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      panelClass: ['of-auto'],
      data: {}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result.item) {
        // TODO в будущем не перезагружать и работать со списком, который уже вызван
        this.vortlistoj$ = this.esperantoService.getWordLists();
      }
    });
  }

  updateWordList(wordList): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      panelClass: ['of-auto'],
      data: {wordList}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      if (result.item) {
        // TODO в будущем не перезагружать и работать со списком, который уже вызван
        this.vortlistoj$ = this.esperantoService.getWordLists();
      }
    });
  }

  delWordList(vortListo: IListWord): void {
    const areYouSure = confirm('Точно удалить список?');
    if (areYouSure) {
      this.esperantoService.delWordList(vortListo).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
        if (res.item) {
          // TODO в будущем не перезагружать и работать со списком, который уже вызван
          this.vortlistoj$ = this.esperantoService.getWordLists();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
