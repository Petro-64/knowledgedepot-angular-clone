import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class modalAnDialogOrchestra {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginPopUpResetSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginPopUpCloseSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  public toggleSideNav() {
    return this.sideNavToggleSubject.next(null);
  } 

  public resetLoginForm() {
    return this.loginPopUpResetSubject.next(null);
  }

  public hideLoginPopUp() {
    return this.loginPopUpCloseSubject.next(null);
  }
}
