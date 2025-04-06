import { ApplicationRef, ComponentRef, createComponent, ViewContainerRef } from '@angular/core';
import { DialogHostComponent } from '../shared/dialog/dialog-host.component';
import { DialogService } from '../shared/dialog/dialog.service';
import { AppComponent } from '../app.component';

export function bootstrapDialogFactory(
    appRef: ApplicationRef,
    dialogService: DialogService
): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        const dialogHostRef = createComponent(DialogHostComponent, {
            environmentInjector: appRef.injector
        });

        appRef.attachView(dialogHostRef.hostView);
        appComponentRef.location.nativeElement.append(dialogHostRef.location.nativeElement);
        dialogService.registerHost(dialogHostRef.injector.get(ViewContainerRef));
    };
}
