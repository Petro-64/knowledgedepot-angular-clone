import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { messages } from '../../../common/translations/login.translations';
import { Observable } from 'rxjs';
import * as LoginAct from '../../../common/actions/login.action';
import { Appstate } from '../../../common/models/appstate';
import { selectAppState } from '../../../common/selectors/app.selector';
import { postLoginInfo } from '../../../common/actions/login.action';
import { modalAnDialogOrchestra } from '../../../common/services/orchestra/modalAndDialogOrchestra.service' 



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  language: Observable<{language: string}>;
  subscr: any;// to be able to unsubscribe onDestroy
  subscrLang: any;
  subscrResetLogin: any;
  translation: any = {};

  constructor( 
    private store: Store<{loginInfo: {email: string}, globalSettings: {language: string}}>,
    private appStore: Store<Appstate>,
    private loginFormResetService: modalAnDialogOrchestra
  ){  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  appState$ = this.appStore.pipe(select(selectAppState))

  ngOnInit(){ 
    this.language = this.store.select('globalSettings');

    this.subscrLang = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
      }
    )
    this.subscrResetLogin = this.loginFormResetService.loginPopUpResetSubject.subscribe(()=> {
      this.reset();
    });
  }
  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });
  getErrorMessageEmail() { 
    if (this.email.hasError('required')) { 
           return this.translation.mustEnterValue;    
          }
    return this.email.hasError('email') ? this.translation.emailIssue : '';
  }
  getErrorMessagePassword() {    if (this.password.hasError('required')) {      return this.translation.mustEnterValue;    }
    return '';
  }
  onSubmit(){    
    this.store.dispatch(postLoginInfo({login: {password: this.loginForm.value.password as string, email: this.loginForm.value.email as string}}));//this.loginForm.value
  }


  reset(){    this.email.setValue(''); this.password.setValue('');  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
    this.subscrLang.unsubscribe();
    this.subscrResetLogin.unsubscribe();
  }
}
