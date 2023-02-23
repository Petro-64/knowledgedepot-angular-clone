import { createAction, props } from '@ngrx/store';
 
export const invokeBooksAPI = createAction(
  'get-subjects-for-effects'
);
 
export const booksFetchAPISuccess = createAction(
  'get-subjects-for-effects-success',
  props<{ subjects: any }>()
);

///https://www.learmoreseekmore.com/2022/06/angular-14-statemanagement-crud-example-with-rxjs14.html