import { createAction, props } from "@ngrx/store";
import { Appstate } from "../models/appstate";
import { LoginResponce } from '../models/login-responce.model'

export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{apiStatus: Appstate}>()
);

export const setLanguage = createAction(
    '[API] set global language',
    props<{currentLanguage: string}>()
);

export const setLoaderSpinnerVisibility = createAction(
    '[API] set loader spinner visibility',
    props<{loaderSpinnerVisibility: boolean}>()
);

export const setLoginResponceInfo = createAction(
    '[API] set loader spinner visibility',
    props<{setLoginResponceInfo: LoginResponce}>()
);

export const setSnackBarMessage = createAction(
    '[API] set snackbar message',
    props<{snackBarMessage: string}>()
);

export const setSnackBarMode = createAction(
    '[API] set snackbar mode',
    props<{snackBarMode: string}>()
);

export const logout = createAction(
    '[API] logout'
);