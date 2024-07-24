import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalNotificationComponent } from './global.notification.component';
import { NotificationService } from './notification.service';
import { ToastModule } from 'src/app/fragments/components/toast/toast.module';

@NgModule({
    imports: [BrowserModule, ToastModule],
    declarations: [GlobalNotificationComponent],
    exports: [GlobalNotificationComponent],
    providers: [NotificationService]
})
export class GlobalNotificationModule {}
