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

    this.drawer.close();

   } 

   close(){
    this.drawer.close();
   }

   items = ['Item 1', 'Item 2'];
   items1 = [{name: 'Test', content: [
    {icon: "question_answer", linkTo: '/tests', word: 'Test'},
    {icon: "library_books", linkTo: '/results', word: 'Results'},
   ]}, {name: 'Account', content: [
    {icon: "assignment", linkTo: '/results', word: 'Add questions'},
    {icon: "account_box", linkTo: '/tests', word: 'My mistakes'}

   ]}];
   expandedIndex = 0;

}
