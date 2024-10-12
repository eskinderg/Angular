import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WzCommonComponent } from '../common/common.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [WzCommonComponent, RouterLink, RouterLinkActive]
})
export class ProfileComponent {}
