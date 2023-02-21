import {Component, Inject, Directive, ElementRef} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialog-data-example.html',
  styleUrls: ['dialog-data-example.css']
})
export class DialogDataExample {
  constructor(public dialog: MatDialog) {}


  openDialog() {
    this.dialog.open(DialogDataExampleDialog);
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor() {}
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */