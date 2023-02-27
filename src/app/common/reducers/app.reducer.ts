import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setLanguage, setLoaderSpinnerVisibility } from '../actions/app.action';
import { Appstate } from '../models/appstate';

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  currentLanguage: 'en',
  loaderSpinnerVisibility: false
};

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  }),
  on(setLanguage, (state, { currentLanguage }) => {
    return {
      ...state,
      currentLanguage
    };
  }),
  ////
  on(setLoaderSpinnerVisibility, (state, { loaderSpinnerVisibility }) => {
    return {
      ...state,
      loaderSpinnerVisibility
    };
  }),
);

