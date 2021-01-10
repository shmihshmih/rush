import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IWord} from '../../../shared/models/esperanto/word.interface';

@Injectable({
  providedIn: 'root'
})
export class EnglishService implements OnDestroy{
  // местоимения
  // tslint:disable-next-line:variable-name
  private _pronounce: Subject<IWord[]> = new Subject<IWord[]>();
  public pronounce$: Observable<IWord[]> = this._pronounce.asObservable();

  constructor() { }
  ngOnDestroy(): void {

  }
}
