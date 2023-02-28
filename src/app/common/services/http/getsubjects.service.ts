import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Subject } from '../../models/subject.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAppState } from '../../selectors/app.selector';
import { Appstate } from '../../models/appstate';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom, tap,  throwError } from 'rxjs';//catchError,
import { catchError } from 'rxjs/operators';

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
    return this.http.get<Subject[]>('http://127.0.0.1:8000/angular/getsubjectsuser').pipe(
      //catchError(err => this.showError(err))
    );
  }

  // create(payload: Subject) {
  //   return this.http.post<Subject>('http://localhost:3000/books', payload);
  // }

  // update(payload: Subject) {
  //   return this.http.put<Subject>(
  //     `http://localhost:3000/books/${payload.id}`,
  //     payload
  //   );
  // }

  // delete(id: number) {
  //   return this.http.delete(`http://localhost:3000/books/${id}`);
  // }
}