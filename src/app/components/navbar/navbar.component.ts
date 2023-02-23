import { Component } from '@angular/core';
import { SidenavService } from '../../common/services/sidenav/sidenav.service' 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sideNavService: SidenavService) {

  }

  clickMenu() { 
    this.sideNavService.toggle();
  }
}
