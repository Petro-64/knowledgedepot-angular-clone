import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setLanguage, setLoaderSpinnerVisibility } from '../actions/app.action';
import { Appstate } from '../models/appstate';
import { saveLoginResponce } from '../actions/login.action';

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  currentLanguage: 'en',
  loaderSpinnerVisibility: false,
  cookie_consent_given: 0,
  id: 0, 
  jwt_token: '',
  name: '',
  role_id: 100,
  success: false, 
  suspension_reason: '', 
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
  on(saveLoginResponce, (state, { loginResponce }) => {
    return {
      ...state,
      ...loginResponce
    };
  }),
);

