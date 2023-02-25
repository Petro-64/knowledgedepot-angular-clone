import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { messages } from '../../../common/translations/login.translations';
//import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Observable } from 'rxjs';
import * as LoginAct from '../../../common/actions/login.action';
import { Login } from '../../../common/models/login.model';
import { setAPIStatus } from '../../../common/store/app.action';
import { selectAppState } from '../../../common/store/app.selector';
import { Appstate } from '../../../common/store/appstate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  language: Observable<{language: string}>;
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};


  constructor( 
    private store: Store<{loginInfo: {email: string}, globalSettings: {language: string}}>,
    private store1: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ){  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit(){ 
    this.language = this.store.select('globalSettings');
  }

  loginForm: Login = {
    email: '',
    password: ''
  };


  save(){

  }

  getErrorMessageEmail() {    if (this.email.hasError('required')) {      return this.translation.mustEnterValue;    }
    return this.email.hasError('email') ? this.translation.emailIssue : '';
  }

  getErrorMessagePassword() {    if (this.password.hasError('required')) {      return this.translation.mustEnterValue;    }
    return '';
  }

  onSubmit(){   
    // console.warn(this.loginForm.value); 
  }

  emailOnChange(){    this.store.dispatch(new LoginAct.getEmail(this.email.value as string));  }

  passwordOnChange(){    console.log(this.password.value);    this.store.dispatch(new LoginAct.getPassword(this.password.value as string));  }

  reset(){    this.updateEmail(''); this.updatePassword('');  }

  updateEmail(value: string): void {    this.email.setValue(value);  }

  updatePassword(value: string): void {    this.password.setValue(value);  }

  ngOnDestroy() {
    //this.subscr.unsubscribe()
  }
}
