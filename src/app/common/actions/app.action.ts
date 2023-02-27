import { createAction, props } from "@ngrx/store";
import { Appstate } from "../models/appstate";

export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{apiStatus: Appstate}>()
);

export const setLanguage = createAction(
    '[API] set global language',
    props<{currentLanguage: string}>()
);