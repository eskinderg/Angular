import { Component, ViewChild } from '@angular/core';
import { AppLoadingComponent } from './fragments/components/appLoading/appLoading.component';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(AppLoadingComponent) appLoadingComponent: AppLoadingComponent;

  constructor() { }

}
