import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubject } from '../../common/selectors/subjects.selector';
import { Appstate } from '../../common/models/appstate';
import { invokeSubjectsAPI } from '../../common/actions/subjects.action';
import { selectAppState } from '../../common/selectors/app.selector';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit, OnDestroy  {
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};

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
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
///https://www.learmoreseekmore.com/2022/06/angular-14-statemanagement-crud-example-with-rxjs14.html