import { createAction, props } from '@ngrx/store';
import { Subject } from '../models/subject.model';

export const invokeSubjectsAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);

export const subjectsFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Subject[] }>()
);

