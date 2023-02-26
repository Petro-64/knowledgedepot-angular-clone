import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from '../actions/app.action';
import { Appstate } from '../store/appstate';
import { BooksService } from '../../common/services/http/getsubjects-for-effects.service';
import {
    invokeSubjectsAPI,
    subjectsFetchAPISuccess,

} from '../actions/subjects-effects.action';
import { selectSubject } from '../selectors/subjects.selector';

@Injectable()
export class SubjectsEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSubjectsAPI),
      withLatestFrom(this.store.pipe(select(selectSubject))),
      mergeMap(([, subjectsFromStore]) => {
        if (subjectsFromStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(map((data) => subjectsFetchAPISuccess({ allSubjects: data })));
      })
    )
  );

//   saveNewBook$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(invokeSaveNewBookAPI),
//       switchMap((action) => {
//         this.appStore.dispatch(
//           setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
//         );
//         return this.booksService.create(action.newBook).pipe(
//           map((data) => {
//             this.appStore.dispatch(
//               setAPIStatus({
//                 apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
//               })
//             );
//             return saveNewBookAPISucess({ newBook: data });
//           })
//         );
//       })
//     );
//   });

//   updateBookAPI$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(invokeUpdateBookAPI),
//       switchMap((action) => {
//         this.appStore.dispatch(
//           setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
//         );
//         return this.booksService.update(action.updateBook).pipe(
//           map((data) => {
//             this.appStore.dispatch(
//               setAPIStatus({
//                 apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
//               })
//             );
//             return updateBookAPISucess({ updateBook: data });
//           })
//         );
//       })
//     );
//   });

//   deleteBooksAPI$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(invokeDeleteBookAPI),
//       switchMap((actions) => {
//         this.appStore.dispatch(
//           setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
//         );
//         return this.booksService.delete(actions.id).pipe(
//           map(() => {
//             this.appStore.dispatch(
//               setAPIStatus({
//                 apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
//               })
//             );
//             return deleteBookAPISuccess({ id: actions.id });
//           })
//         );
//       })
//     );
//   });
}