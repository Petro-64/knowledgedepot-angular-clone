import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Login } from '../../models/login.model';
import { LoginResponce } from '../../models/login-responce.model';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../models/appstate';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private appStore: Store<Appstate>
    ) {
    
  }

  post(payload: Login) {
    this.appStore.dispatch(      setLoaderSpinnerVisibility({ loaderSpinnerVisibility: true  })    );
    return this.http.post<LoginResponce>('http://127.0.0.1:8000/angular/login', payload);
  }
}