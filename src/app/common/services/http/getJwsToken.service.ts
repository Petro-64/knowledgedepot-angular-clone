import { Injectable } from '@angular/core';
import { TestResult } from '../../models/test-result.model';
import { Store, select } from '@ngrx/store';
import { setLoaderSpinnerVisibility } from '../../actions/app.action';
import { Appstate } from '../../models/appstate';
import { selectAppState } from '../../selectors/app.selector';

@Injectable({
  providedIn: 'root',
})
export class getJwsToken {
  constructor( private appStore: Store<Appstate>) {}

  appState$ = this.appStore.pipe(select(selectAppState))
  JwsToken = '';
  subscr: any;// to be able to unsubscribe onDestroy

  get() {
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.JwsToken = data.jwt_token;
      }
    )
    return this.JwsToken;
  }
}