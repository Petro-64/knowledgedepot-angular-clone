import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestResult } from '../models/test-result.model';

export const selectResult = createFeatureSelector<TestResult[]>('results');