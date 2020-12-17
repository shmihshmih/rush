import {IWord} from '../../../../shared/models/esperanto/word.interface';
import {EsperantoService} from '../../../../core/services/esperanto/esperanto.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IListWord} from '../../../../shared/models/esperanto/word_list.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  vortlistoj$: Observable<IListWord[]>;

  constructor(
    public esperantoService: EsperantoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vortlistoj$ = this.esperantoService.getWordLists();
  }

  openListWord(title: string): void {
    this.router.navigate(['esperanto', 'vortlisto', title]);
  }

  openCardExercise(title: string): void {
    this.router.navigate(['esperanto', 'vortokarto', title]);
  }
}
