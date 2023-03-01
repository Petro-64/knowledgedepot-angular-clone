import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { modalAnDialogOrchestra } from '../../../common/services/orchestra/modalAndDialogOrchestra.service'
import { Observable, of, Subject } from 'rxjs';

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'snack-bar-component-example',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.css'],
})
export class SnackbarComponent {
  durationInSeconds = 5;
  subscrOpenSnackBar: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private openSnackBarService: modalAnDialogOrchestra
  ) {}

  ngOnInit(){ 
    this.subscrOpenSnackBar = this.openSnackBarService.showSnackBarSubject.subscribe(()=> {
      if(this.openSnackBarService.showSnackBarSubject.value == 1){// to track if this  a first call and avoid it during onInit
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
    });
  }

  ngOnDestroy() {
    this.subscrOpenSnackBar.unsubscribe();
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [
    `
    .example-pizza-party {
      color: yellow;

    }

    .mat-mdc-snack-bar-container .mdc-snackbar__surface {
        background-color: red
      }
  `,
  ],
})
export class PizzaPartyComponent {

  message: string = 'message33'
}