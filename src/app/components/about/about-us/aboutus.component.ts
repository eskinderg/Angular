import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-aboutus',
    templateUrl: 'aboutus.component.html',
    styleUrls: ['aboutus.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {}
