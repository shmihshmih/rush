import { Observable, of } from 'rxjs';
import { IWord } from './../../../../shared/models/esperanto/word.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {
  public pronomoj: IWord[] = [
    { main: 'Mi',   english: 'I',    russian: 'Я' },
    { main: 'Ni',   english: 'We',   russian: 'Мы' },
    { main: 'Vi',   english: 'You',  russian: 'Ты' },
    { main: 'Vi',   english: 'You',  russian: 'Вы' },
    { main: 'Li',   english: 'He',   russian: 'Он' },
    { main: 'Si ',  english: 'She',  russian: 'Она' },
    { main: 'Gi',   english: 'It',   russian: 'Оно' },
    { main: 'Ili ', english: 'They', russian: 'Они' }
  ];
  constructor() { }
  getPronomoj(): Observable<IWord[]> {
    return of(this.pronomoj);
  }
}
