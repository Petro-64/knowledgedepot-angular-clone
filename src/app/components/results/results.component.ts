import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubject } from '../../common/selectors/subjects.selector';
import { Appstate } from '../../common/models/appstate';
import { invokeResultsAPI } from '../../common/actions/results.action';
import { selectAppState } from '../../common/selectors/app.selector';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class ResultsComponent {
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};

  constructor( 
    private store: Store,
    private appStore: Store<Appstate>
  ){  }

  ngOnInit(): void {
    this.store.dispatch(invokeResultsAPI());

  }


}
