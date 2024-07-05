import { ComponentRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalNotificationComponent } from '../shared/notification/global.notification.component';

export function bootstrapAppNotificationFactory(): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        appComponentRef.instance.appViewContainerRef.createComponent(GlobalNotificationComponent);
    };
}
