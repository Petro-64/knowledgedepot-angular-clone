import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { TestResult } from '../../models/test-result.model';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../models/appstate';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';

@Injectable({
  providedIn: 'root',
})
export class getResultsService {
  constructor(
    private http: HttpClient,
    private appStore: Store<Appstate>
    ) {
    
  }
  get() {
    this.appStore.dispatch(      setLoaderSpinnerVisibility({ loaderSpinnerVisibility: true  })    );
    return this.http.get<TestResult[]>('http://127.0.0.1:8000/angular/results').pipe(
    );
  }
}