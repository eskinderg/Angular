import { Component } from '@angular/core';

import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [fadeInAnimation]
  // host: { '[@routerFadeInAnimation]': '' }
})
export class AboutComponent {}
