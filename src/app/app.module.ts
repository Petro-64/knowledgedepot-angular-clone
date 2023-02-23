import { NgModule, isDevMode } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { LoginFormComponent } from './components/parts/login-form/login-form.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SubjectsEffectTs } from './common/effects/subjects.effect.ts'
import { subjectsReducer } from './common/reducers/subjects-for-effects.reducer'


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
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    MatExpansionModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('mybooks', subjectsReducer),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    EffectsModule.forRoot([SubjectsEffectTs]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [GetSubjectsService],
  bootstrap: [AppComponent], 
})
export class AppModule { }
