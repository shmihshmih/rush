import { IWord } from './../../../shared/models/esperanto/word.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EsperantoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPronomoj(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_pronomoj.json');
  }
}

