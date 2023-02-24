import { Action, createAction, props } from '@ngrx/store';

export const GET_LOGIN_DATA ='GET_LOGIN_DATA';
export const GET_LOGIN_EMAIL ='GET_LOGIN_EMAIL';
export const GET_LOGIN_PASSWORD ='GET_LOGIN_PASSWORD';


export class getEmail implements Action {
    readonly type: string =  GET_LOGIN_EMAIL;
    constructor(public payload: string) { }
}

export class getPassword implements Action {
    readonly type: string =  GET_LOGIN_PASSWORD;
    constructor(public payload: string) { }
}
