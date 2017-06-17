import { Component } from '@angular/core';
// import { Config } from './shared/config/env.config';
import { environment } from '../environments/environment'; // import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // debugger;
    console.log('Environment config', environment);
  }
}
