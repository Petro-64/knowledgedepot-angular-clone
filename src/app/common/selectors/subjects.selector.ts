import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectModel } from '../models/subject.model';

export const selectSubject = createFeatureSelector<SubjectModel[]>('subjects');

