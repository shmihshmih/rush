import { IWord } from './../../../../shared/models/esperanto/word.interface';
import { EsperantoService } from './../../../../core/services/esperanto/esperanto.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  pronomoj$: Observable<IWord[]>;

  constructor(
    private esperantoService: EsperantoService
  ) { }

  ngOnInit(): void {
    this.pronomoj$ = this.esperantoService.getPronomojFromJSON();
  }

}
