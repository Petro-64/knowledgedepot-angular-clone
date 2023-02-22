import { SubjectsState,  subjectsReducer } from './subjects.reducer';
import { LoginState,  loginReducer } from './login.reducer';
import { GlobalSettingsState,  globalSettingsReducer } from './global-settings.reducer';
import { ActionReducerMap } from '@ngrx/store';


export const rootReducer = {};

export interface AppState {
    subjectsList: SubjectsState;
    globalSettings: GlobalSettingsState;
    loginInfo: LoginState;
};


export const reducers: ActionReducerMap<AppState, any> = {
    subjectsList: subjectsReducer,
    globalSettings: globalSettingsReducer,
    loginInfo: loginReducer
};