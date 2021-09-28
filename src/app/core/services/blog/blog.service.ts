import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) {
  }

  /**
   * Получить необходимую часть
   * @param quest
   * @param part
   */
  // getQuestPart(quest: string, part: number = 1): Observable<any> {
  //   const params = new HttpParams().set('quest', quest).set('part', part.toString());
  //   return this.httpClient.get(`${this.apiService.MAIN_SERVER}blog/bookQuest`, {params});
  // }
  getQuestPart(quest: string, part: number = 1): Observable<any> {
    if (quest === 'thestainlesssteelrat') {
      return this.httpClient.get<any[]>(`./assets/collections/thestainlesssteelrat.json`).pipe(
        map((res) => {
          const partWeNeed = res.filter(record => +record.id === +part);
          return partWeNeed;
        })
      );
    }
  }

  /**
   * Получить список всех квестов
   */
  // getBookQuestList(): Observable<any> {
  //   return this.httpClient.get(`${this.apiService.MAIN_SERVER}blog/bookQuestList`);
  // }
  getBookQuestList(): Observable<any> {
    return this.httpClient.get(`./assets/collections/bookquestlist.json`);
  }

}
