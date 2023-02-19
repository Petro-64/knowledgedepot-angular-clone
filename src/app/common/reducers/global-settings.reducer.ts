import * as GlobalSettingsAct from '../actions/global-settings.action';

export interface GlobalSettingsState {
    language: string;
}

const initialState: GlobalSettingsState = {
    language:  'en',
}

export function globalSettingsReducer(state: GlobalSettingsState = initialState, action: GlobalSettingsAct.SetLanguage): GlobalSettingsState {
    switch(action.type){
        case GlobalSettingsAct.SET_LANGUAGE:
            return {
                ...state, 
                language: action.payload
            };
        default: 
            return {
                ...state
            };
    }
}