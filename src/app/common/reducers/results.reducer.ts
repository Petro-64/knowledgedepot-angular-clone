import { createReducer, on } from '@ngrx/store';
import { TestResult } from '../models/test-result.model';
import { resultsFetchAPISuccess } from '../actions/results.action';
export const initialState: ReadonlyArray<TestResult> = [];

export const resultsReducer = createReducer(
  initialState,
  on(resultsFetchAPISuccess, (state, { testResults }) => {
    return testResults;
  })

);
