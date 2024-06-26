import { Component, viewChild } from '@angular/core';
import { AppLoadingComponent } from './fragments/components/appLoading/appLoading.component';

@Component({
    selector: 'app-main',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appVersion: string;
    appLoadingComponent = viewChild.required<AppLoadingComponent>('appLoading');

    constructor() {}
}
