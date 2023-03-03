import { modalAnDialogOrchestra } from '../../common/services/orchestra/modalAndDialogOrchestra.service';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { messages } from '../../common/translations/login.translations';
import { Appstate } from '../../common/models/appstate';
import { selectAppState } from '../../common/selectors/app.selector'; 
import { logout } from '../../common/actions/app.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private sideNavService: modalAnDialogOrchestra,
    private store: Store,
    private appStore: Store<Appstate>
    ) {

  }
  subscr: any;// to be able to unsubscribe onDestroy
  translation: any = {};
  currentRoleId: number;
  appState$ = this.appStore.pipe(select(selectAppState))
  ifLoggedIn: boolean;


  ngOnInit(): void {
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.translation = data.currentLanguage == 'en' ? messages.en : messages.ru;
        this.currentRoleId = data.role_id;
        this.ifLoggedIn = this.currentRoleId == 1 || this.currentRoleId == 2 ? true : false;
      }
    )
  }

  logout(){
    this.store.dispatch(logout());
  }


  clickMenu() { 
    this.sideNavService.toggleSideNav();
  }
}
