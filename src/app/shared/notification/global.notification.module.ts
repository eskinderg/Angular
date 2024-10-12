import { NgModule } from '@angular/core';

import { GlobalNotificationComponent } from './global.notification.component';
import { NotificationService } from './notification.service';

@NgModule({
    imports: [GlobalNotificationComponent],
    exports: [GlobalNotificationComponent],
    providers: [NotificationService]
})
export class GlobalNotificationModule {}
