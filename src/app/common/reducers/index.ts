import { SubjectsState,  subjectsReducer } from './subjects.reducer';
import { ActionReducerMap } from '@ngrx/store';


export const rootReducer = {};

export interface AppState {
    subjectsList: SubjectsState;
};


export const reducers: ActionReducerMap<AppState, any> = {
    subjectsList: subjectsReducer
};