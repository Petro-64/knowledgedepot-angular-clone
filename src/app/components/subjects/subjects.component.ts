import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { GetSubjectsService } from '../../common/services/http/getsubjects.service';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubject } from '../../common/selectors/subjects.selector';
//import { invokeBooksAPI } from '../../common/actions/subjects-for-effects.action';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appstate } from '../../common/store/appstate';
import { invokeSubjectsAPI } from '../../../app/common/actions/subjects-effects.action';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})



export class SubjectsComponent implements OnInit, OnDestroy  {
  subjects: Observable<{subjects: Subject[]}>;
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};


  constructor( 
    private getSubjectsService: GetSubjectsService,
    private store: Store,
    private appStore: Store<Appstate>
  ){  }

  books$ = this.store.pipe(select(selectSubject));
  
  ngOnInit(): void {
    this.store.dispatch(invokeSubjectsAPI());
    this.books$.subscribe((data) => {
      console.log(data)
    })
  }

  ngOnDestroy() {
    //this.subscr.unsubscribe()
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
///https://www.learmoreseekmore.com/2022/06/angular-14-statemanagement-crud-example-with-rxjs14.html