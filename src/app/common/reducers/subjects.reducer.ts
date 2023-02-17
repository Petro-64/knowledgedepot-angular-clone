import { Action } from '@ngrx/store';
import { Subject } from '../../common/models/subject.model';
///import { GET_SUBJECTS } from '../actions/subjects.action';
import * as SubjectsAct from '../actions/subjects.action';

export interface SubjectsState {
    subjects: Subject[];
}

const hh: Subject = {
    id: 1,  name: 'HTML', active: 'asasd', created_at: 'asasd', updated_at: 'asasd', questions_number: 1
}

const hh1: Subject = {
    id: 1,  name: 'PHP', active: 'asasd', created_at: 'asasd', updated_at: 'asasd', questions_number: 1
}

const initialState: SubjectsState = {
    subjects: []
}

export function subjectsReducer(state: SubjectsState = initialState, action: SubjectsAct.GetSubjects): SubjectsState {
    switch(action.type){
        case SubjectsAct.GET_SUBJECTS:
            return {
                ...state, 
                subjects: action.payload
            };

        case SubjectsAct.ADD_SUBJECTS:    
            return {
                ...state, 
                subjects: [...state.subjects.concat(action.payload)]
            };
        default: 
            return {
                ...state
            };
    }
}