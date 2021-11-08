import {Injectable, OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {selectIsAuth} from '../../state/auth/auth.selectors';
import {AngularFireAuth} from '@angular/fire/compat/auth';

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
    private store: Store,
    private afAuth: AngularFireAuth
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
  login(email, password): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  checkAuth(): Observable<any> {
    return this.afAuth.user;
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
