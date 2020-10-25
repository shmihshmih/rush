import { DictionaryService } from './store/dictionary.service';
import { IWord } from './../../../shared/models/esperanto/word.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EsperantoService {

  constructor(
    private httpClient: HttpClient,
    private dictionaryService: DictionaryService
  ) { }

/**
 * In the future we must choose JSON or Store. It depences on base we will use.
 */
  public getPronomojFromJSON(): Observable<IWord[]> {
    return this.httpClient.get<IWord[]>('./assets/esperanto/_pronomoj.json');
  }

  public getPronomoj(): Observable<IWord[]> {
    return this.dictionaryService.getPronomoj();
  }

  public makePastVerb() {}
  public makePresentVerb() {}
  public makeFutureVerb() {}
  public makeVerb() {}
  public makeAdjective() {}
  public makeAdverb() {}
}

