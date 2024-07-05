import { ApplicationRef, ComponentRef, createComponent } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalNotificationComponent } from '../shared/notification/global.notification.component';

export function bootstrapAppNotificationFactory(
    appRef: ApplicationRef
): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        const globalNotificationCompRef = createComponent(GlobalNotificationComponent, {
            environmentInjector: appRef.injector
        });

        appRef.attachView(globalNotificationCompRef.hostView);

        appComponentRef.location.nativeElement.append(globalNotificationCompRef.location.nativeElement);
    };
}
