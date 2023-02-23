import { createReducer, on } from "@ngrx/store";
import { booksFetchAPISuccess }  from '../actions/subjects-for-effects.action'
 
export const initialState: ReadonlyArray<any> = [];
 
export const subjectsReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, { subjects }) => {
      return subjects;
    })
);