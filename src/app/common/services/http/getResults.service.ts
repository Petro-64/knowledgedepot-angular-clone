import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { TestResult } from '../../models/test-result.model';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../models/appstate';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';
import { getJwsToken } from '../http/getJwsToken.service'

@Injectable({
  providedIn: 'root',
})
export class getResultsService {
  constructor(    private http: HttpClient,    private appStore: Store<Appstate>, private JwsTok: getJwsToken    ) {     }
  JwsToken: string;
 

  get() {
    this.JwsToken = this.JwsTok.get();
    this.appStore.dispatch(      setLoaderSpinnerVisibility({ loaderSpinnerVisibility: true  })    );
    const headers= new HttpHeaders().set('JWToken', this.JwsToken);
    return this.http.get<TestResult[]>('http://127.0.0.1:8000/angular/results',  {headers: headers}).pipe(
    );
  }
}