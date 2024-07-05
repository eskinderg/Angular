import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public appVersion: string;
}
