import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
///import { Subject } from '../../common/models/subject.model';
//import { selectSubject } from '../../common/selectors/subjects.selector';
//import { invokeBooksAPI } from '../../common/actions/subjects-for-effects.action';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appstate } from '../../../common/models/appstate';
import { selectAppState } from '../../../common/selectors/app.selector';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css']
})
export class LoaderSpinnerComponent {
  constructor( 
    private appStore: Store<Appstate>
  ){  }
  visibility: boolean;
  appState$ = this.appStore.pipe(select(selectAppState))
  subscr: any;// to be able to unsubscribe onDestroy
  ngOnInit(): void {
    this.subscr = this.appState$.subscribe(
      (data) => {
        this.visibility = data.loaderSpinnerVisibility;
      }
    )
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
