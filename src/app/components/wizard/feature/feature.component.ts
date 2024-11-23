import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WzCommonComponent } from '../common/common.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-feature',
    templateUrl: 'feature.component.html',
    styleUrls: ['feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [WzCommonComponent, RouterLink, RouterLinkActive]
})
export class FeatureComponent {}
