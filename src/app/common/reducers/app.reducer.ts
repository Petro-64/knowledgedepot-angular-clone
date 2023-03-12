import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setLanguage, setLoaderSpinnerVisibility, setSnackBarMessage, setSnackBarMode, logout } from '../actions/app.action';
import { Appstate } from '../models/appstate';
import { saveLoginResponce } from '../actions/login.action';
import { resultsFetchAPISuccess } from '../actions/results.action'

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  currentLanguage: 'en',
  loaderSpinnerVisibility: false,
  cookie_consent_given: 0,
/* 
  id: 0, 
  jwt_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoyLCJsb2dpbl90aW1lc3RhbXAiOjE2Nzg2NTE2NjV9.Ap9XljD8KbZWsy6Wv4g7GW7Akq0VpYEA/+frssSn8jA=',
  name: 'Petro',
  role_id: 2,
  success: true, 
 */
  id: 0, 
  jwt_token: '',
  name: '',
  role_id: 100,
  success: false,


  suspension_reason: '', 
  snackBarMessage: '',
  snackBarMode: '',
  testResults: []
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

  on(setSnackBarMessage, (state, { snackBarMessage }) => {
    return {
      ...state,
      snackBarMessage
    };
  }),

  on(setSnackBarMode, (state, { snackBarMode }) => {
    return {
      ...state,
      snackBarMode
    };
  }),

  on(logout, (state) => {
    return {
      ...state,
      cookie_consent_given: 0,
      id: 0, 
      jwt_token: '',
      name: '',
      role_id: 100,
      success: false, 
      suspension_reason: '', 
    };
  }),

  on(resultsFetchAPISuccess, (state, {testResults}) => {
    return {
      ...state,
      testResults: testResults
    };
  }),

);

