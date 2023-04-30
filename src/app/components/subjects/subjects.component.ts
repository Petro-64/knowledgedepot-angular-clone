import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubjectModel } from '../../common/models/subject.model';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubject } from '../../common/selectors/subjects.selector';
import { Appstate } from '../../common/models/appstate';
import { invokeSubjectsAPI } from '../../common/actions/subjects.action';
import { selectAppState } from '../../common/selectors/app.selector';
import { EMPTY, mergeMap, switchMap, withLatestFrom, catchError, throwError, merge, mergeAll } from 'rxjs';

import {mapTo, take, tap, map, max, reduce, filter, count, delay} from "rxjs/operators";
import {from, of, fromEvent, interval} from 'rxjs';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit, OnDestroy  {
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};
  list1 = [1, 6, 15, 10, 58, 2, 40];

  constructor( 
    private store: Store,
    private appStore: Store<Appstate>
  ){  }

  subjects$ = this.store.pipe(select(selectSubject));
  appState$ = this.appStore.pipe(select(selectAppState))
  
  ngOnInit(): void {
    this.store.dispatch(invokeSubjectsAPI());
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
      }
    )
    ////////////////////////////////////////////
    // const source = interval(3500).pipe(take(2));
    // const example = source
    // .pipe(
    //   map(val => source.pipe(delay(100), take(3))),
    //   mergeAll()
    // )
    // .subscribe(val => console.log(val));

    //source.subscribe(val => console.log(val));
    
    ///////////////////////////////////////////
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
///https://www.learmoreseekmore.com/2022/06/angular-14-statemanagement-crud-example-with-rxjs14.html