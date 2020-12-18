import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public MAIN_SERVER = 'http://localhost:5000/api/';
  public MAIN_SERVER_AUTH = 'http://localhost:5000/api/user/';
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient
  ) {
  }

  login(loginData): Observable<any> {
    const authData = loginData;
    return this.httpClient.post(`${this.MAIN_SERVER_AUTH}auth`, authData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuth.next(false);
  }
}
