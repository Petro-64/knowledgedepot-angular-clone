import { Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom, tap, catchError, throwError } from 'rxjs';
import { Appstate } from '../models/appstate';
import { SubjectService } from '../services/http/getsubjects.service';
import { LoginService } from '../services/http/postlogin.service';
import { invokeSubjectsAPI, subjectsFetchAPISuccess } from '../actions/subjects.action';
import { postLoginInfo, saveLoginResponce } from '../actions/login.action';

import { selectSubject } from '../selectors/subjects.selector';
import { setLoaderSpinnerVisibility, setSnackBarMessage, setSnackBarMode } from '../actions/app.action';
import { HttpErrorResponse } from '@angular/common/http';
import { modalAnDialogOrchestra } from '../services/orchestra/modalAndDialogOrchestra.service';
import { selectAppState } from '../selectors/app.selector';
import { messages } from '../translations/login.translations';

@Injectable()
export class SubjectsEffect {
  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private LoginService: LoginService,
    private store: Store,
    private appStore: Store<Appstate>,
    private loginFormResetService: modalAnDialogOrchestra,
    private loginFormCloseService: modalAnDialogOrchestra,
    private showSnackBarService: modalAnDialogOrchestra,
  ) {}

  translation: any = {};
  appState$ = this.appStore.pipe(select(selectAppState))

  subscrAppState = this.appState$.subscribe(
    (data) => {
      this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
    }
  );


  loadSubjectsUser$ = createEffect(() =>
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
            }),

            map((data) => subjectsFetchAPISuccess({ allSubjects: data })),

          );
      })
    )
  );


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postLoginInfo),
      switchMap((action) => {
        return this.LoginService.post(action.login).pipe(
          tap(() => {
            this.loginFormResetService.resetLoginForm();
            this.loginFormCloseService.hideLoginPopUp();
            this.appStore.dispatch(setSnackBarMessage({ snackBarMessage: this.translation.success }));
            this.appStore.dispatch(setSnackBarMode({ snackBarMode: 'success' }));
            this.showSnackBarService.showSnackBar(); 
          }),
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
            this.loginFormResetService.resetLoginForm();
            this.loginFormCloseService.hideLoginPopUp();
            this.appStore.dispatch(setSnackBarMessage({ snackBarMessage: this.translation.wrongEmailOrPassword }));
            this.appStore.dispatch(setSnackBarMode({ snackBarMode: 'error' }));
            this.showSnackBarService.showSnackBar();    
            return throwError(errorMsg);
          })
        );
      })
    );
  });

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