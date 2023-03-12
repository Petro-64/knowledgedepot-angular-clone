import { createAction, props } from '@ngrx/store';
import { TestResult } from '../models/test-result.model';

export const invokeResultsAPI = createAction(
  '[Results API] Invoke results Fetch API'
);

export const resultsFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ testResults: TestResult[] }>()
);