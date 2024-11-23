import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './components/shared/shared.module';

@Component({
    selector: 'app-main',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SharedModule, RouterOutlet]
})
export class AppComponent {
    public appVersion: string;
}
