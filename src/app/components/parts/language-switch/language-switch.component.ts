import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})

export class LanguageSwitchComponent implements OnInit{

  constructor( 
    private store: Store<{globalSettings: {language: string}}>
  ){  }
 
  // switch(){
  //     if(this.languageValue == 'en'){
  //       this.languageValue = 'ru'; 
  //       this.setLanguage('ru');
  //     } else {
  //       this.languageValue = 'en';
  //       this.setLanguage('en');
  //     }
      
  // }

  // setLanguage(lang: string){
  //   this.store.dispatch(new LanguagesAct.SetLanguage(lang));
  // }

  ngOnInit(){
   // this.language = this.store.select('globalSettings');
  }
}
