import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import * as LoginAct from '../../../common/actions/login.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor( 
    private store: Store<{loginInfo: {email: string}}>
  ){  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  getErrorMessageEmail() {    if (this.email.hasError('required')) {      return 'You must enter a value';    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {    if (this.password.hasError('required')) {      return 'You must enter a value';    }
    return '';
  }

  onSubmit(){    console.warn(this.loginForm.value);  }

  ngOnInit(){      }

  emailOnChange(){    this.store.dispatch(new LoginAct.getEmail(this.email.value as string));  }

  passwordOnChange(){    console.log(this.password.value);    this.store.dispatch(new LoginAct.getPassword(this.password.value as string));  }

  reset(){    this.updateEmail(''); this.updatePassword('');  }

  updateEmail(value: string): void {    this.email.setValue(value);  }

  updatePassword(value: string): void {    this.password.setValue(value);  }
}
