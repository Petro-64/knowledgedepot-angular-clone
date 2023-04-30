import { Component, OnInit, ViewChild } from '@angular/core';
import { modalAnDialogOrchestra } from '../../common/services/orchestra/modalAndDialogOrchestra.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubjectModel } from '../../common/models/subject.model';
//import { GetSubjectsService } from '../../common/services/http/getsubjects.service';
import { messages } from '../../common/translations/subjects.translations';
import { selectSubject } from '../../common/selectors/subjects.selector';
//import { invokeBooksAPI } from '../../common/actions/subjects-for-effects.action';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appstate } from '../../common/models/appstate';
import { invokeSubjectsAPI } from '../../common/actions/subjects.action';
import { selectAppState } from '../../common/selectors/app.selector';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private sideNavService: modalAnDialogOrchestra,
    private store: Store,
    private appStore: Store<Appstate>
    ) { 
  }
  subscr: any;// to be able to unsubscribe onDestroy
  appState$ = this.appStore.pipe(select(selectAppState))
  translation: any = {};
  items1 = [{name: 'Test', content: [
    {icon: "question_answer", linkTo: '/tests', word: 'Test'},
    {icon: "library_books", linkTo: '/subjects', word: 'Subjects'},
   ]}, {name: 'Account', content: [
    {icon: "assignment", linkTo: '/results', word: 'Results'},
   ]}, {name: 'Admin', content: [
    {icon: "assignment", linkTo: '/results', word: 'Results'},
   ]}];


  ngOnInit() { 
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.drawer.toggle();
    });
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
        if(data.role_id == 100){
          this.items1 = [{name: 'Test', content: [
            {icon: "question_answer", linkTo: '/tests', word: 'Test'},
            {icon: "library_books", linkTo: '/subjects', word: 'Subjects'},
           ]}];
        } else if(data.role_id == 1){
          this.items1 = [{name: 'Test', content: [
            {icon: "question_answer", linkTo: '/tests', word: 'Test'},
            {icon: "library_books", linkTo: '/subjects', word: 'Subjects'},
           ]}, {name: 'Account', content: [
            {icon: "assignment", linkTo: '/results', word: 'Results'},
           ]}];
        } else if(data.role_id == 2){
          this.items1 = [{name: 'Test', content: [
            {icon: "question_answer", linkTo: '/tests', word: 'Test'},
            {icon: "library_books", linkTo: '/subjects', word: 'Subjects'},
           ]}, {name: 'Account', content: [
            {icon: "assignment", linkTo: '/results', word: 'Results'},
           ]}, {name: 'Admin', content: [
            {icon: "assignment", linkTo: '/results', word: 'Results'},
           ]}];
        }
      }
    )
    this.drawer.close();
  } 

   close(){
    this.drawer.close();
   }
   

   expandedIndex = 0;

}
