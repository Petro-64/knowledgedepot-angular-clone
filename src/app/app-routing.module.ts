import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './components/tests/tests.component';
import { ResultsComponent } from './components/results/results.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthGuard } from './common/services/auth-guard.service';




const routes: Routes = [
  { path: 'tests', component: TestsComponent },
  { path: 'results', component: ResultsComponent },////canActivate: [AuthGuard],
  { path: 'subjects',  component: SubjectsComponent },
  { path: '', component: SubjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],//GetSubjectsService
  exports: [RouterModule]
})
export class AppRoutingModule { }
