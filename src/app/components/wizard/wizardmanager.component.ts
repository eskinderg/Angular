import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    selector: 'app-about',
    templateUrl: 'wizardmanager.component.html',
    styleUrls: ['wizardmanager.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardManagerComponent {
    // @HostBinding('@routerFadeInAnimation')

    constructor() {}
}
