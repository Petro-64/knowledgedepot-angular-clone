import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Subject } from '../../models/subject.model';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../models/appstate';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(
    private http: HttpClient,
    private appStore: Store<Appstate>
    ) {
    
  }
  get() {
    this.appStore.dispatch(      setLoaderSpinnerVisibility({ loaderSpinnerVisibility: true  })    );
    return this.http.get<Subject[]>('http://127.0.0.1:8000/angular/results').pipe(
      //catchError(err => this.showError(err))
    );
  }