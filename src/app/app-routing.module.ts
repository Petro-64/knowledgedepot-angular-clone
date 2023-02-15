import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './components/tests/tests.component';
import { ResultsComponent } from './components/results/results.component';



const routes: Routes = [
  { path: 'tests', component: TestsComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
