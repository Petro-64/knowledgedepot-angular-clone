import { createReducer, on } from '@ngrx/store';
import { SubjectModel } from '../models/subject.model';
import { invokeSubjectsAPI, subjectsFetchAPISuccess} from '../actions/subjects.action';

export const initialState: ReadonlyArray<SubjectModel> = [];

export const subjectReducer = createReducer(
  initialState,
  on(subjectsFetchAPISuccess, (state, { allSubjects }) => {
    return allSubjects;
  })

);