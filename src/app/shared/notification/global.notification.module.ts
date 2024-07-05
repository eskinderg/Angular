import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GlobalNotificationComponent } from './global.notification.component';
import { NotificationService } from './notification.service';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [GlobalNotificationComponent],
    exports: [GlobalNotificationComponent],
    providers: [NotificationService]
})
export class GlobalNotificationModule {}
