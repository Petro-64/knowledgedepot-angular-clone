import { Subject } from '../../common/models/subject.model';
import * as SubjectsAct from '../actions/subjects.action';

export interface SubjectsState {
    subjects: Subject[];
    names: string;
}

const initialState: SubjectsState = {
    subjects: [],
    names: ''
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