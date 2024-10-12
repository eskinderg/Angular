import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { WzToolbarComponent } from './wztoolbar/wztoolbar.component';
import { CardComponent } from '../../fragments/components/card/card.component';
import { RouterOutlet } from '@angular/router';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    selector: 'app-about',
    templateUrl: 'wizardmanager.component.html',
    styleUrls: ['wizardmanager.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [WzToolbarComponent, CardComponent, RouterOutlet]
})
export class WizardManagerComponent {
    // @HostBinding('@routerFadeInAnimation')

    constructor() {}
}
