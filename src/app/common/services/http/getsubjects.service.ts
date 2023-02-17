import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from '../../models/subject.model';
import { Store } from '@ngrx/store';
import * as SubjectsAct from '../../actions/subjects.action';


@Injectable()
export class GetSubjectsService {
    private Url = 'http://127.0.0.1:8000/react/subjects';

    private subjects: Subject[] = [];

    constructor (
        private store: Store<{subjectsList: {subjects: Subject[]}}>,
        private http: HttpClient
    ){}

    getSubjects(){
        this.http
        .get<any>(this.Url, { responseType: 'json'})
        .subscribe(data => {
            this.subjects = data.payload.subjects;
            this.store.dispatch(new SubjectsAct.GetSubjects(data.payload.subjects));
        });
    }
}