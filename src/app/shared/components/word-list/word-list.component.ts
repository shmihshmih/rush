import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {IWord} from '../../models/esperanto/word.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  listWord$: Observable<IWord[]>;

  displayedColumns: string[] = ['esperanto', 'english', 'russian'];
  dataSource: MatTableDataSource<IWord>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute,
              private esperantoService: EsperantoService) {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      if (params.vortListo) {
        this.loadListWords(params.vortListo);
      }
    });
  }

  loadListWords(list: string): void {
    if (!list) {
      return;
    }
    this.esperantoService.getWordsByWordList(list).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((words: IWord[]) => {
      this.dataSource = new MatTableDataSource(words);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}

