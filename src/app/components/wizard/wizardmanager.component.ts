import { Component, HostBinding } from '@angular/core';

import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'app-about',
  templateUrl: 'wizardmanager.component.html',
  styleUrls: ['wizardmanager.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@routerFadeInAnimation]': '' }
})
export class WizardManagerComponent {
  // @HostBinding('@routerFadeInAnimation')

  constructor() {}
}
