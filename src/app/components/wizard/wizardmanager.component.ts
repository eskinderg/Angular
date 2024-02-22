import { Component } from '@angular/core';

import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'app-about',
  templateUrl: 'wizardmanager.component.html',
  styleUrls: ['wizardmanager.component.scss'],
  animations: [fadeInAnimation]
})
export class WizardManagerComponent {
  // @HostBinding('@routerFadeInAnimation')

  constructor() {}
}
