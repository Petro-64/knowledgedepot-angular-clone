import { Component } from '@angular/core';
import { modalAnDialogOrchestra } from '../../common/services/orchestra/modalAndDialogOrchestra.service' 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sideNavService: modalAnDialogOrchestra) {

  }
  clickMenu() { 
    this.sideNavService.toggleSideNav();
  }
}
