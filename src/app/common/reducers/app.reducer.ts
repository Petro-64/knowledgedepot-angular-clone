import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setLanguage } from '../actions/app.action';
import { Appstate } from '../models/appstate';

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  currentLanguage: 'en'
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
  })
  );

