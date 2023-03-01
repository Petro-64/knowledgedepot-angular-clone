import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class modalAnDialogOrchestra {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginPopUpResetSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginPopUpCloseSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public showSnackBarSubject: BehaviorSubject<any> = new BehaviorSubject(8);

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

  public showSnackBar() {
    console.log("showSnackBar in orchestra and value is", this.showSnackBarSubject.value);
    
    return this.showSnackBarSubject.next(1);
  }
}
