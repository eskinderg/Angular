import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { NotificationService } from './notification.service';
import { ToastComponent } from '../../fragments/components/toast/toast';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-global-notification',
    templateUrl: './global.notification.component.html',
    styleUrls: ['./global.notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ToastComponent, AsyncPipe]
})
export class GlobalNotificationComponent {
    constructor(public notificationService: NotificationService) {}

    @HostBinding('class') class: string = 'toast-container position-fixed bottom-0 end-0 p-3';

    @HostBinding('style.z-index') zIndex = 1200;
}
