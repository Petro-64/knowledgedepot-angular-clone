import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { messages } from '../../common/translations/subjects.translations';
import { Appstate } from '../../common/models/appstate';
import { invokeResultsAPI } from '../../common/actions/results.action';
import { selectResult } from '../../common/selectors/results.selector';
import { selectAppState } from '../../common/selectors/app.selector';
import { TestResult } from '../../common/models/test-result.model'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class ResultsComponent {
  subscr: any;// to be able to unsubscribe onDestroy
  subscrSubj: any;
  translation: any = {};

  appState$ = this.appStore.pipe(select(selectAppState))
  results$ = this.store.pipe(select(selectResult));


  constructor( 
    private store: Store,
    private appStore: Store<Appstate>
  ){  }

  ngOnInit(): void {
    this.store.dispatch(invokeResultsAPI());
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
      }
    )
  }
  

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }


  displayedColumns: string[] = ['resultId', 'answered_questions_number', 'quality', 'createdAt', 'subjectName'];

}


