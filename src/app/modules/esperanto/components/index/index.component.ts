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
  // pronomoj$: Observable<IWord[]>;
  // verboj$: Observable<IWord[]>;
  // adjektivoj$: Observable<IWord[]>;
  // demandoVortoj$: Observable<IWord[]>;
  // konjunkcioj$: Observable<IWord[]>;
  // prepozicioj$: Observable<IWord[]>;
  // numeraloj$: Observable<IWord[]>;
  // fruktoj$: Observable<IWord[]>;
  // tempo$: Observable<IWord[]>;
  vortlistoj$: Observable<IListWord[]>;

  constructor(
    public esperantoService: EsperantoService,
    private router: Router
  ) {
    this.esperantoService.init();
  }

  ngOnInit(): void {
    // this.pronomoj$ = this.esperantoService.getPronounsFromJSON();
    // this.verboj$ = this.esperantoService.getVerbsFromJSON();
    // this.adjektivoj$ = this.esperantoService.getAdjectivesFromJSON();
    // this.demandoVortoj$ = this.esperantoService.getDemandoVortojFromJSON();
    // this.konjunkcioj$ = this.esperantoService.getKonjunkciojFromJSON();
    // this.prepozicioj$ = this.esperantoService.getPrepoziciojFromJSON();
    // this.numeraloj$ = this.esperantoService.getNumeralojFromJSON();
    // this.fruktoj$ = this.esperantoService.getFruktojFromJSON();
    // this.tempo$ = this.esperantoService.getTempoFromJSON();
    this.vortlistoj$ = this.esperantoService.vortlistoj$;
  }

  openListWord(title: string): void {
    this.router.navigate(['esperanto', 'vortlisto', title]);
  }

  openCardExercise(title: string): void {
    this.router.navigate(['esperanto', 'vortokarto', title]);
  }
}
