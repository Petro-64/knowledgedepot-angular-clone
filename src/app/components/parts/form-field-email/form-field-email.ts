import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/** @title Form field with error messages */
@Component({
  selector: 'form-field-email',
  templateUrl: 'form-field-email.html',
  styleUrls: ['form-field-email.css'],
})
export class FormFieldEmailExample {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */