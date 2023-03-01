import { createReducer, on } from '@ngrx/store';
import { Subject } from '../models/subject.model';
import { invokeSubjectsAPI, subjectsFetchAPISuccess} from '../actions/subjects.action';

export const initialState: ReadonlyArray<Subject> = [];

export const subjectReducer = createReducer(
  initialState,
  on(subjectsFetchAPISuccess, (state, { allSubjects }) => {
    return allSubjects;
  })

);