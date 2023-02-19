import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LanguagesAct from '../../../common/actions/global-settings.action';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})

export class LanguageSwitchComponent implements OnInit{
  language: Observable<{language: string}>;

  languageValue: string = 'en';
  constructor( 
    private store: Store<{globalSettings: {language: string}}>
  ){  }
 
  switch(){
      if(this.languageValue == 'en'){
        this.languageValue = 'ru'; 
        this.setLanguage('ru');
      } else {
        this.languageValue = 'en';
        this.setLanguage('en');
      }
      
  }

  setLanguage(lang: string){
    this.store.dispatch(new LanguagesAct.SetLanguage(lang));
  }

  ngOnInit(){
    this.language = this.store.select('globalSettings');
  }
}
