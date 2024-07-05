import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
    selector: 'app-global-notification',
    templateUrl: './global.notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNotificationComponent {
    constructor(public notificationService: NotificationService) {}

    @HostBinding('class') class: string = 'toast-container position-fixed bottom-0 end-0 p-3';

    @HostBinding('style.z-index') zIndex = 1200;
}
