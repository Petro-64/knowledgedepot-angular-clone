import { Component, OnInit, ViewChild } from '@angular/core';
import { modalAnDialogOrchestra } from '../../common/services/orchestra/modalAndDialogOrchestra.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(private sideNavService: modalAnDialogOrchestra) { 
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
    {icon: "library_books", linkTo: '/subjects', word: 'Subjects'},
   ]}, {name: 'Account', content: [
    {icon: "assignment", linkTo: '/results', word: 'Results'},
    {icon: "account_box", linkTo: '/subjects', word: 'Subjects'}

   ]}];
   expandedIndex = 0;

}
