import { ApplicationRef, ComponentRef, createComponent, ViewContainerRef } from '@angular/core';
import { DialogHostComponent } from '../shared/dialog/dialog-host.component';
import { DialogService } from '../shared/dialog/dialog.service';
import { AppComponent } from '../app.component';

export function bootstrapDialogFactory(
    appRef: ApplicationRef,
    dialogService: DialogService
): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        const hostRef = createComponent(DialogHostComponent, {
            environmentInjector: appRef.injector
        });

        appRef.attachView(hostRef.hostView);
        appComponentRef.location.nativeElement.append(hostRef.location.nativeElement);
        dialogService.registerHost(hostRef.injector.get(ViewContainerRef));
    };
}
