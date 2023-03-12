import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Subject } from '../models/subject.model';

export const selectSubject = createFeatureSelector<Subject[]>('subjects');

