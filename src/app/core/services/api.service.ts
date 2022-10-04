import {Injectable, OnDestroy} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ToastrService} from 'ngx-toastr';
import {logoutFail, logoutSuccess} from '../../state/auth/auth.actions';
import {IUserAdmin} from '../../shared/models/main.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  public MAIN_SERVER = environment.MAIN_SERVER;
  public MAIN_SERVER_AUTH = environment.MAIN_SERVER_AUTH;
  unsubscribe$: Subject<boolean> = new Subject();

  public user: IUserAdmin;

  menuItems = [
    {
      routerLink: ['autoHR'],
      icon: 'assignment',
      caption: 'AutoHR'
    },
    {
      routerLink: ['languages'],
      icon: 'language',
      caption: 'Languages'
    },
    {
      routerLink: ['blog'],
      icon: 'fact_check',
      caption: 'Blog'
    }
  ];

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
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
