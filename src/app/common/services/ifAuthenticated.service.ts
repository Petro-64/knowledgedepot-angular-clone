import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../models/appstate';
import { selectAppState } from '../selectors/app.selector';
import { IsAuthenticated } from '../models/authenticated.model';

@Injectable()
export class ifAuthenticated {
  constructor( private appStore: Store<Appstate>) {}

  appState$ = this.appStore.pipe(select(selectAppState))
  JwsToken: string = '';
  isAuth: IsAuthenticated = {JwtToken: '', ifAdmin: false, ifUser: false};
  subscr: any;// to be able to unsubscribe onDestroy

  getInfo() {
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.isAuth.JwtToken = data.jwt_token;
        this.isAuth.ifAdmin = data.role_id == 2;
        this.isAuth.ifUser = data.role_id == 1 || data.role_id == 2;
      }
    )
    return this.isAuth;
  }
}