import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) {
  }

  getQuestPart(quest: string, part: number = 1): Observable<any> {
    const params = new HttpParams().set('quest', quest).set('part', part.toString());
    return this.httpClient.get(`${this.apiService.MAIN_SERVER}blog/bookQuest`, {params});
  }

  getBookQuestList(): Observable<any> {
    return this.httpClient.get(`${this.apiService.MAIN_SERVER}blog/bookQuestList`);
  }

}
