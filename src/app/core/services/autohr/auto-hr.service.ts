import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap, Observable, of} from 'rxjs';
import {ITask} from '../../../shared/models/autoHR/question.model';
import {ApiService} from '../api.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoHRService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private readonly afs: AngularFirestore
  ) {
  }

  // получить все вопросы
  // getAllTasks(): Observable<ITask[]> {
  //   return this.http.get<ITask[]>(`${this.apiService.MAIN_SERVER}autohr/questionList`);
  // }
  getAllTasks(): Observable<ITask[]> {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.afs.collection<ITask>('tasks');
    return tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ITask;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    // return this.http.get<ITask[]>(`./assets/collections/questionmodels.json`);
  }

  // добавить вопрос
  addTask(newTask): Observable<ITask> {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.afs.collection<ITask>('tasks');
    const id = this.afs.createId();
    const params = {...newTask, id};
    return from(tasksCollection.doc(id).set({...params})).pipe(
      mergeMap((res) => {
        return of({...params});
      })
    );
  }

  // удалить вопрос
  delTask(newTask): Observable<any> {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.afs.collection<ITask>('tasks');
    return from(tasksCollection.doc(newTask.id).delete());
  }

  // обновить вопрос
  updateTask(task): Observable<any> {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.afs.collection<ITask>('tasks');
    return from(tasksCollection.doc(task.id).update({...task})).pipe(
      mergeMap((res) => {
        return of({...task});
      })
    );
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
