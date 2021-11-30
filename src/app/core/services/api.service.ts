import {Injectable, OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ToastrService} from 'ngx-toastr';
import {logoutFail, logoutSuccess} from '../../state/auth/auth.actions';
import {Router} from '@angular/router';
import {IUserAdmin} from '../../shared/models/main.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  public MAIN_SERVER = environment.MAIN_SERVER;
  public MAIN_SERVER_AUTH = environment.MAIN_SERVER_AUTH;
  unsubscribe$: Subject<boolean> = new Subject();

  public user: IUserAdmin;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  toastOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    onclick: null,
    showDuration: '30000',
    hideDuration: '1000',
    timeOut: 30000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };

  login(email, password): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): void {
    this.afAuth.signOut()
      .then((res) => {
          this.store.dispatch(logoutSuccess());
          location.reload();
        },
        (error) => {
          this.store.dispatch(logoutFail({error: error.toString()}));
        });
  }

  // checkAuth(): void {
  //   this.afAuth.onAuthStateChanged(
  //     (authData) => {
  //       if (authData) {
  //         const user = {
  //           refreshToken: authData.refreshToken,
  //           email: authData.email,
  //           uid: authData.uid,
  //           displayName: authData.displayName
  //         };
  //         this.user = user;
  //         this.store.dispatch(checkAuthSuccess({authData: user}));
  //       } else {
  //         this.user = null;
  //         this.store.dispatch(checkAuthSuccess({authData: initialUserState}));
  //       }
  //
  //       if (!!this.user?.uid) {
  //         // получение всех списков слов
  //         this.store.dispatch(loadWordLists());
  //
  //         // получение всех слов
  //         this.store.dispatch(loadWords());
  //
  //         // получение всех вопросов
  //         this.store.dispatch(loadTasks());
  //       } else {
  //         // получение всех списков слов
  //         this.store.dispatch(loadWordListsByJSON());
  //
  //         // получение всех слов
  //         this.store.dispatch(loadWordsByJSON());
  //
  //         // получение всех вопросов
  //         this.store.dispatch(loadTasksByJSON());
  //       }
  //
  //       // Вещи в любом случае прогружаемые с фронта
  //       // справочники autoHR
  //       this.store.dispatch(loadDifficultyCatalog());
  //       this.store.dispatch(loadCompetenceCatalog());
  //       this.store.dispatch(loadPopularityCatalog());
  //
  //       // return user;
  //     },
  //     error => {
  //       return of(checkAuthFail({error: error.toString()}));
  //     },
  //     () => {
  //
  //     });
  //   // return this.afAuth.user;
  // }

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

  showError(error: string): void {
    this.toastr.error(`${error}`, 'Ошибка!', this.toastOptions);
  }

  /** Скачать дамп измененных данных */
  downloadObjectAsJson(exportObj = [], exportName = 'dump'): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
