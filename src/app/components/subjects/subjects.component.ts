import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import { GetSubjectsService } from '../../common/services/http/getsubjects.service';
import { messages } from '../../common/translations/subjects.translations';

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

  ngOnInit(){
    this.subjects = this.store.select('subjectsList');
    this.language = this.store.select('globalSettings');
    this.subscr = this.language.subscribe(
      data => {
        this.translation = data.language == 'en' ? messages.en : messages.ru
      }
    )
    this.getSubjectsService.getSubjects();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe()
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
