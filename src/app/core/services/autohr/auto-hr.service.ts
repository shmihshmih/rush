import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ITask} from '../../../shared/models/autoHR/question.model';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {ApiService} from '../api.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoHRService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  // получить все вопросы
  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiService.MAIN_SERVER}autohr/questionList`);
  }

  // добавить вопрос
  addTask(newTask): Observable<any> {
    const params = newTask;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.http.post(`${this.apiService.MAIN_SERVER}autohr/task`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  // удалить вопрос
  delTask(newTask): Observable<any> {
    const params = newTask._id;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.http.delete(`${this.apiService.MAIN_SERVER}autohr/task`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  // обновить вопрос
  updateTask(task): Observable<any> {
    const params = task;
    const token = localStorage.getItem('token');
    if (token) {
      return this.apiService.checkToken().pipe(
        switchMap((isAuth): Observable<any> => {
          if (isAuth.error) {
            return of(false);
          } else if (isAuth.token && isAuth.decoded) {
            return of(true);
          }
        }),
        switchMap(auth => {
          if (auth) {
            return this.http.put(`${this.apiService.MAIN_SERVER}autohr/task`, {params});
          } else {
            return of({message: 'Вы не можете совершить эту операцию!'});
          }
        })
      );
    } else {
      return of({error: 'NoAuth', message: 'Залогиньтесь!'});
    }
  }

  getAllTasksByJSON(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`./assets/_tasks.json`);
  }

  getDifficulties(): Observable<any[]> {
    const difficulties = [
      'beginner', 'junior', 'middle', 'senior'
    ];
    return of(difficulties);
  }

  getCompetences(): Observable<any[]> {
    const competences = [
      'common questions', 'javascript', 'typescript', 'angular', 'react', 'nodejs', 'html', 'css', 'frontend', 'backend'
    ];
    return of(competences);
  }

  getPopularity(): Observable<any[]> {
    const popularity = [
      '1', '2', '3', '4', '5'
    ];
    return of(popularity);
  }
}
