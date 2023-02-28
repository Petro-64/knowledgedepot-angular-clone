import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom, tap, catchError, throwError } from 'rxjs';
import { Appstate } from '../models/appstate';
import { SubjectService } from '../services/http/getsubjects.service';
import {
    invokeSubjectsAPI,
    subjectsFetchAPISuccess,

} from '../actions/subjects-effects.action';
import { selectSubject } from '../selectors/subjects.selector';
import { setLoaderSpinnerVisibility } from '../actions/app.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SubjectsEffect {
  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
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
        return this.subjectService
          .get()
          .pipe(
            tap(() => {
              this.appStore.dispatch(setLoaderSpinnerVisibility({ loaderSpinnerVisibility: false  }));
            }),
            map((data) => subjectsFetchAPISuccess({ allSubjects: data })),
            catchError(error => {
              let errorMsg: string;
              if (error.error instanceof ErrorEvent) {
                  errorMsg = `Error: ${error.error.message}`;
              } else {
                  errorMsg = this.getServerErrorMessage(error);
              }
              this.appStore.dispatch(setLoaderSpinnerVisibility({ loaderSpinnerVisibility: false  }));
              alert(errorMsg);
              return throwError(errorMsg);
          })
          );
      })
    )
  );


  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}



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