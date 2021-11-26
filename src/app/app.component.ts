import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectIsAuth} from './state/auth/auth.selectors';
import {ApiService} from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store,
              private apiService: ApiService
  ) {
    // проверяем авторизацию1
    // this.apiService.checkAuth();
    // this.store.dispatch(checkAuth());
  }
}
