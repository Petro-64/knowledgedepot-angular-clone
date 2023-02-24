import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { getSubjectsService } from '../services/http/getsubjects-for-effects.service';
import { booksFetchAPISuccess, invokeBooksAPI } from '../actions/subjects-for-effects.action';
import { selectSubjects } from '../selectors/subjects.selector';


@Injectable()
export class SubjectsEffectTs {
    constructor(
        private actions$: Actions,
        private booksService: getSubjectsService,
        private store: Store
      ) {}

    loadAllBooks$ = createEffect(() =>
      this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectSubjects))),
      mergeMap(([, bookformStore]) => {
        if (bookformStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ subjects: data })));
      })
    )
  );

}



