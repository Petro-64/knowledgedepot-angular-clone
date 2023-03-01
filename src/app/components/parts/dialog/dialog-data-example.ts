import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { messages } from '../../../common/translations/login.translations';
import { Appstate } from '../../../common/models/appstate';
import { selectAppState } from '../../../common/selectors/app.selector';
import { modalAnDialogOrchestra } from '../../../common/services/orchestra/modalAndDialogOrchestra.service';

@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialog-data-example.html',
  styleUrls: ['dialog-data-example.css']
})

export class DialogDataExample {
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private appStore: Store<Appstate>,
    private loginPopUpCloseService: modalAnDialogOrchestra,
  ) {}

  ngOnInit() { 
      this.loginPopUpCloseService.loginPopUpCloseSubject.subscribe(()=> {
        this.dialog.closeAll();
      });
      
  } 


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

  appState$ = this.appStore.pipe(select(selectAppState))
  constructor( 
    public dialog: MatDialog,
    private store: Store,
    private appStore: Store<Appstate>
  ){  }

  ngOnInit(){ 
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
      }
    )
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */