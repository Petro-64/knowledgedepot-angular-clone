import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { modalAnDialogOrchestra } from '../../../common/services/orchestra/modalAndDialogOrchestra.service'
import { Observable, of, Subject } from 'rxjs';
import { Appstate } from '../../../common/models/appstate';
import { Store, select } from '@ngrx/store';
import { selectAppState } from '../../../common/selectors/app.selector';
import { messages } from '../../../common/translations/subjects.translations';
//import { OnDestroy  } from '@angular/core';



/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'snack-bar-component-example',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.less'],
})
export class SnackbarComponent implements OnInit {
  durationInSeconds = 5;
  subscrOpenSnackBar: any;
  translation: any = {};
  shackBarMesage: string;
  snackBarClass: string = 'app-notification-error';
  subscr: any;// to be able to unsubscribe onDestroy

  constructor(
    private _snackBar: MatSnackBar,
    private openSnackBarService: modalAnDialogOrchestra,
    private appStore: Store<Appstate>
  ) {}
  
  appState$ = this.appStore.pipe(select(selectAppState))


  ngOnInit(){ 
    this.subscrOpenSnackBar = this.openSnackBarService.showSnackBarSubject.subscribe(()=> {
      if(this.openSnackBarService.showSnackBarSubject.value == 1){// to track if this  a first call and avoid it during onInit
        this.openSnackBar();
      }
    });

    this.subscr = this.appState$.subscribe(
      (data) => {
        data.snackBarMode == 'error' ? this.snackBarClass = 'app-notification-error' : this.snackBarClass = 'app-notification-success';
      }
    )
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      panelClass: this.snackBarClass
    });
  }

  ngOnDestroy() {
    this.subscrOpenSnackBar.unsubscribe();
    this.subscr.unsubscribe();
  }
}

////////////////////////////////////////////////////////////////////


@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styleUrls: ['snackbar.component.less'],
})
export class PizzaPartyComponent implements OnInit{
  constructor(
    private appStore: Store<Appstate>
  ) {}
  translation: any = {};
  appState$ = this.appStore.pipe(select(selectAppState))
  subscrAppState: any;
  message: string = ''


  ngOnInit(){ 
    this.subscrAppState = this.appState$.subscribe(
      (data) => {
        this.message = data.snackBarMessage;
      }
    )
  }

  

  ngOnDestroy() {
    this.subscrAppState.unsubscribe();
  }
}