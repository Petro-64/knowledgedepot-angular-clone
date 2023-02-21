import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/** @title Form field with error messages */
@Component({
  selector: 'form-field-password',
  templateUrl: 'form-field-password.html',
  styleUrls: ['form-field-password.css'],
})
export class FormFieldPasswordExample {
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}