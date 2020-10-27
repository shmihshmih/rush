import { Observable, of } from 'rxjs';
import { IWord } from './../../../../shared/models/esperanto/word.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {
  public pronomoj: IWord[] = [
    { esperanto: 'Mi',   english: 'I',    russian: 'Я' },
    { esperanto: 'Ni',   english: 'We',   russian: 'Мы' },
    { esperanto: 'Vi',   english: 'You',  russian: 'Ты' },
    { esperanto: 'Vi',   english: 'You',  russian: 'Вы' },
    { esperanto: 'Li',   english: 'He',   russian: 'Он' },
    { esperanto: 'Si ',  english: 'She',  russian: 'Она' },
    { esperanto: 'Gi',   english: 'It',   russian: 'Оно' },
    { esperanto: 'Ili ', english: 'They', russian: 'Они' }
  ];
  constructor() { }
  getPronomoj(): Observable<IWord[]> {
    return of(this.pronomoj);
  }
}
