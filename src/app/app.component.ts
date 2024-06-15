import { Component, OnInit, ViewChild } from '@angular/core';
import { AppLoadingComponent } from './fragments/components/appLoading/appLoading.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appVersion: string;
  @ViewChild(AppLoadingComponent) appLoadingComponent: AppLoadingComponent;

  constructor() {}

  ngOnInit() {
    this.appVersion = environment.appVersion;
  }
}
