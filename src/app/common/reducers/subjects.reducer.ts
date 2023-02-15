import { Action } from '@ngrx/store';
import { Subject } from '../../common/models/subject.model';
///import { GET_SUBJECTS } from '../actions/subjects.action';
import * as SubjectsAct from '../actions/subjects.action';

const initialState = {
    subjects: []
}


export function subjectsReducer(state = initialState, action: SubjectsAct.GetSubjects){
    switch(action.type){
        case SubjectsAct.GET_SUBJECTS:
            return {
                ...state, 
                subjects: [...state.subjects, action.payload]
            };
        default: 
            return {
                state
            };
    }
}