import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Subject } from '../models/subject.model';

export const selectSubject = createFeatureSelector<Subject[]>('subjects');

// export const selectBookById = (bookId: number) =>
//   createSelector(selectSubject, (books: Subject[]) => {
//     var bookbyId = books.filter((_) => _.id == bookId);
//     if (bookbyId.length == 0) {
//       return null;
//     }
//     return bookbyId[0];
//   });