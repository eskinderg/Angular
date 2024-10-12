import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-feature',
    templateUrl: 'feature.component.html',
    styleUrls: ['feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FeatureComponent {}
