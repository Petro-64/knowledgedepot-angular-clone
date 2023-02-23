import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { GetSubjectsService } from '../../common/services/http/getsubjects.service';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubjects } from '../../common/selectors/subjects.selector';
import { invokeBooksAPI } from '../../common/actions/subjects-for-effects.action'


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit, OnDestroy  {
  subjects: Observable<{subjects: Subject[]}>;
  language: Observable<{language: string}>;
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};


  constructor( 
    private getSubjectsService: GetSubjectsService,
    private store: Store<{subjectsList: {subjects: Subject[]}, globalSettings: {language: string}}>
  ){  }

  books$ = this.store.pipe(select(selectSubjects));


  ngOnInit(): void{
    this.subjects = this.store.select('subjectsList');
    this.language = this.store.select('globalSettings');
    this.subscr = this.language.subscribe(
      data => {
        this.translation = data.language == 'en' ? messages.en : messages.ru
      }
    )
    this.getSubjectsService.getSubjects();
    this.store.dispatch(invokeBooksAPI());
    this.books$.subscribe(
      data => {
        if(data.payload){
          console.log(data.payload.subjects)
        }
     
      }
    );
  }

  ngOnDestroy() {
    this.subscr.unsubscribe()
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
