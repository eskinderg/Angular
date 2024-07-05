import { ApplicationRef, ComponentRef, createComponent } from '@angular/core';
import { AppComponent } from '../app.component';
import { BaBackTopComponent } from '../fragments/components/baBackTop';

export function bootstrapBackButtonFactory(
    appRef: ApplicationRef
): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        const baBackTopCompRef = createComponent(BaBackTopComponent, {
            environmentInjector: appRef.injector
        });

        appRef.attachView(baBackTopCompRef.hostView);

        appComponentRef.location.nativeElement.append(baBackTopCompRef.location.nativeElement);
    };
}
