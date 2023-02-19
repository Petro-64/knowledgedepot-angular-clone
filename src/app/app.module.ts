import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TestsComponent } from './components/tests/tests.component';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './common/reducers';
import { HttpClientModule } from "@angular/common/http";
import { GetSubjectsService } from './common/services/http/getsubjects.service';
import { LanguageSwitchComponent } from './components/parts/language-switch/language-switch.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    TestsComponent,
    ResultsComponent,
    SubjectsComponent,
    LanguageSwitchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    MatExpansionModule,
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [GetSubjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
