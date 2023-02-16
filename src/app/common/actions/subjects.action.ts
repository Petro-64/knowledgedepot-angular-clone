import { Action } from '@ngrx/store';
import { Subject } from '../../common/models/subject.model';

export const GET_SUBJECTS ='GET_SUBJECTS';

export class GetSubjects implements Action {
    readonly type: string =  GET_SUBJECTS;
    constructor(public payload: Subject[]) { }
}

