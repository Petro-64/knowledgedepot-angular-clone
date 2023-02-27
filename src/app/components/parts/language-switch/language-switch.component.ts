import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAppState } from '../../../common/selectors/app.selector';
import { Appstate } from '../../../common/models/appstate';
import { setLanguage } from '../../../common/actions/app.action'

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})

export class LanguageSwitchComponent implements OnInit{

  constructor( 
    private appStore: Store<Appstate>

  ){  }
  appState$ = this.appStore.pipe(select(selectAppState))
  toggle(){
    if(this.language == 'en'){
      this.language = 'ru'
      this.appStore.dispatch(
        setLanguage({ currentLanguage: 'ru'  })
      );
    } else {
      this.language = 'en'
      this.appStore.dispatch(
        setLanguage({ currentLanguage: 'en'  })
      );
    }

  }
  subscr: any

  language: string = ''
  ngOnInit(){
   // this.language = this.store.select('globalSettings');
   this.subscr = this.appState$.subscribe((data) => {
    this.language = data.currentLanguage;
   })
  }
  ngOnDestroy() {
    this.subscr.unsubscribe()
  }

}
