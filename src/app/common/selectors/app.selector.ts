import { createFeatureSelector } from '@ngrx/store';
import { Appstate } from '../models/appstate';

export const selectAppState = createFeatureSelector<Appstate>('appState');