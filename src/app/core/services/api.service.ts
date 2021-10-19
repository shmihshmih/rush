import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {selectIsAuth} from '../../state/auth/auth.selectors';
import {logout} from '../../state/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  public MAIN_SERVER = environment.MAIN_SERVER;
  public MAIN_SERVER_AUTH = environment.MAIN_SERVER_AUTH;
  public isAuth$: Observable<boolean> = this.store.select(selectIsAuth);
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private store: Store
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
  login(): Observable<any> {
    const authData = localStorage.getItem('authData');
    return of(JSON.parse(authData));
  }

  logout(): void {
    this.store.dispatch(logout());
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
