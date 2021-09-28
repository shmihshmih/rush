import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  public MAIN_SERVER = environment.MAIN_SERVER;
  public MAIN_SERVER_AUTH = environment.MAIN_SERVER_AUTH;
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient
  ) {
    // this.authWithToken().pipe(
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(isAuth => {
    //   if (isAuth.error) {
    //     this.isAuth.next(false);
    //     localStorage.removeItem('token');
    //   } else if (isAuth.token && isAuth.decoded) {
    //     this.isAuth.next(true);
    //   }
    // });
  }

  // login(loginData): Observable<any> {
  //   const authData = loginData;
  //   return this.httpClient.post(`${this.MAIN_SERVER_AUTH}auth`, authData);
  // }
  login(loginData): Observable<any> {
    const authData = loginData;
    return of({token: '12345'});
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuth.next(false);
  }

  checkToken(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${this.MAIN_SERVER_AUTH}isAuth`, {token});
  }

  authWithToken(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${this.MAIN_SERVER_AUTH}isAuth`, {token});
  }

  /**
   * Возвращает данные из json по адресу
   * @param q полный адрес
   */
  public getDataFromJSON(q: string): Observable<any[]> {
    return this.httpClient.get<any[]>(q);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
