import { createAction, props } from '@ngrx/store';
import { SubjectModel } from '../models/subject.model';

export const invokeSubjectsAPI = createAction(
  '[Books API] Invoke Subjects Fetch API'
);

export const subjectsFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allSubjects: SubjectModel[] }>()
);

