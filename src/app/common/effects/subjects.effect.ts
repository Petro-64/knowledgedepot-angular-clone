import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom, tap, catchError, throwError } from 'rxjs';
import { Appstate } from '../models/appstate';
import { SubjectService } from '../services/http/getsubjects.service';
import { LoginService } from '../services/http/postlogin.service';
import { invokeSubjectsAPI, subjectsFetchAPISuccess } from '../actions/subjects.action';
import { setAPIStatus, fakeAction } from '../../common/actions/app.action';
import { postLoginInfo, saveLoginResponce } from '../actions/login.action';

import { selectSubject } from '../selectors/subjects.selector';
import { setLoaderSpinnerVisibility } from '../actions/app.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SubjectsEffect {
  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private LoginService: LoginService,
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


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postLoginInfo),
      switchMap((action) => {
        return this.LoginService.post(action.login).pipe(
          map((data) => {
            this.appStore.dispatch(
              saveLoginResponce({ loginResponce: data })
            );
            return  setLoaderSpinnerVisibility({ loaderSpinnerVisibility: false  });
          }),
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
    );
  });
  // petro.niemkov@gmail.com
  // updateBookAPI$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(invokeUpdateBookAPI),
  //     switchMap((action) => {
  //       this.appStore.dispatch(
  //         setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
  //       );
  //       return this.booksService.update(action.updateBook).pipe(
  //         map((data) => {
  //           this.appStore.dispatch(
  //             setAPIStatus({
  //               apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
  //             })
  //           );
  //           return updateBookAPISucess({ updateBook: data });
  //         })
  //       );
  //     })
  //   );
  // });

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

}