import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnauthorizedModule } from './components/unauthorized/unauthorized.module';
import { GlobalNotificationModule } from './shared/notification/global.notification.module';
import { NotfoundModule } from './components/shared/404/404.module';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './components/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-main',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        UnauthorizedModule,
        GlobalNotificationModule,
        NotfoundModule,
        AuthorizationModule,
        SharedModule,
        RouterOutlet
    ]
})
export class AppComponent {
    public appVersion: string;
}
