import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(private sideNavService: SidenavService) { 
  }

  ngOnInit() { 
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.drawer.toggle();
    });
   } 

}
