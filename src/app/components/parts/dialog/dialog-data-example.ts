import {Component, Inject, Directive, ElementRef} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { messages } from '../../../common/translations/login.translations';
import { Observable } from 'rxjs';
import * as LoginAct from '../../../common/actions/login.action';

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
  styleUrls: ['dialog-data-example-dialog.css']
})
export class DialogDataExampleDialog implements OnInit {
  language: Observable<{language: string}>;
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};


  close(){
    console.log('close');
    //this.close();
    //this.closeAll();
  }

  constructor( 
    private store: Store<{loginInfo: {email: string}, globalSettings: {language: string}}>
  ){  }

  ngOnInit(){ 
  }

}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */