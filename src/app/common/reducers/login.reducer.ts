import { Subject } from '../../common/models/subject.model';
import * as LoginAct from '../actions/login.action';

export interface LoginState {
    email: string;
    password: string;
}

const initialState: LoginState = {
    email: '',
    password: ''
}

export function loginReducer(state: LoginState = initialState, action: LoginAct.getEmail): LoginState {
    switch(action.type){
        case LoginAct.GET_LOGIN_EMAIL:
            return {
                ...state, 
                email: action.payload
            };

        case LoginAct.GET_LOGIN_PASSWORD:
            return {
                ...state, 
                password: action.payload
            };

        default: 
            return {
                ...state
            };
    }
}