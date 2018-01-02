import { Component } from '@angular/core';

import { SlideAnimation }   from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class AboutComponent { }
