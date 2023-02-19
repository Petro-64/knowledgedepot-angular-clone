import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';
import * as SubjectsAct from '../../common/actions/subjects.action';
import { GetSubjectsService } from '../../common/services/http/getsubjects.service';
import { messages } from '../../common/translations/subjects.translations';
import * as LanguagesAct from '../../common/actions/global-settings.action';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit, OnDestroy  {
  subjects: Observable<{subjects: Subject[]}>;
  language: Observable<{language: string}>;
  subscr: any;
  currLanguage: string = '';
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
        this.currLanguage = data.language;
        this.translation = this.currLanguage == 'en' ? messages.en : messages.ru
      }
    )
    this.getSubjectsService.getSubjects();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe()
  }

  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'questions_number'];
}
