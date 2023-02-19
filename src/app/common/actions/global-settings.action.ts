import { Action } from '@ngrx/store';

export const SET_LANGUAGE ='SET_LANGUAGE';


export class SetLanguage implements Action {
    readonly type: string =  SET_LANGUAGE;
    constructor(public payload: string) { }
}

