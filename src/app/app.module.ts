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
import {DialogDataExample, DialogDataExampleDialog} from './components/parts/dialog/dialog-data-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {FormFieldEmailExample} from './components/parts/form-field-email/form-field-email';
import {FormFieldPasswordExample} from './components/parts/form-field-password/form-field-password';
import { LoginFormComponent } from './components/parts/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    TestsComponent,
    ResultsComponent,
    SubjectsComponent,
    LanguageSwitchComponent,
    DialogDataExample, 
    DialogDataExampleDialog,
    FormFieldEmailExample,
    FormFieldPasswordExample,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    MatExpansionModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [GetSubjectsService],
  bootstrap: [AppComponent], 
})
export class AppModule { }
