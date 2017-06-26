import { Component } from '@angular/core';
// import { Config } from './shared/config/env.config';
import { environment } from '../environments/environment'; // import './operators';

import { LoggingService } from './error/loggingservice';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'ng-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  errorOccured:boolean = false;

  constructor(errorLog:LoggingService) {
    // debugger;
    errorLog.onError.subscribe((error) =>{
        this.errorOccured = true;
        // console.log(error);
    });
    console.log('Environment config', environment);
  }
}
