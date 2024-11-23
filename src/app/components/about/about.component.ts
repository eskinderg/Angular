import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardComponent } from '../../fragments/components/card/card.component';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    selector: 'app-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation],
    imports: [RouterLink, RouterLinkActive, RouterOutlet, CardComponent]
})
export class AboutComponent {}
