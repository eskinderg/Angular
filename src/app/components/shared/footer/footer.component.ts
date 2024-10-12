import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FooterComponent {}
