import { createAction, props } from "@ngrx/store";
import { Login } from "../models/login.model";
import { LoginResponce } from "../models/login-responce.model";


export const postLoginInfo = createAction(
    '[API] post login info',
    props<{ login: Login }>()
);


export const saveLoginResponce = createAction(
    '[API] save login responce',
    props<{ loginResponce: LoginResponce }>()
);

