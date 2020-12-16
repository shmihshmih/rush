import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public MAIN_SERVER = 'http://localhost:5000/api/';

  constructor() {
  }
}
