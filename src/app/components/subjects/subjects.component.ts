import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from '../../common/models/subject.model';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent implements OnInit {

  subjects: Observable<{subjects: Subject[]}>;
  constructor(
    private store: Store<{subjectsList: {subjects: Subject[]}}>
  ){
   
  }

  ngOnInit(){
    this.subjects = this.store.select('subjectsList');
  }

}
