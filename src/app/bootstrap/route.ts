import { ApplicationRef, ComponentRef, createComponent } from '@angular/core';
import {
    Router,
    RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    Event
} from '@angular/router';
import { filter } from 'rxjs';
import { AppComponent } from '../app.component';
import { AppLoadingComponent } from '../fragments/components/appLoading/appLoading.component';

export function bootstrapAppRouteFactory(
    router: Router,
    appRef: ApplicationRef
): (appComponentRef: ComponentRef<AppComponent>) => void {
    return (appComponentRef: ComponentRef<AppComponent>) => {
        const appLoadingComponentRef = createComponent(AppLoadingComponent, {
            environmentInjector: appRef.injector
        });

        appRef.attachView(appLoadingComponentRef.hostView);
        appComponentRef.location.nativeElement.append(appLoadingComponentRef.location.nativeElement);

        router.events
            .pipe(filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent))
            .subscribe((routerEvent: RouterEvent) => {
                _navigationInterceptor(routerEvent, appLoadingComponentRef.instance);
            });
    };
}

function _navigationInterceptor(event: RouterEvent, appLoadingComponent: AppLoadingComponent): void {
    switch (event.constructor) {
        case NavigationEnd:
            appLoadingComponent.loading = false;
            break;

        case NavigationError:
        case NavigationCancel:
        case NavigationStart:
            appLoadingComponent.loading = true;
            break;

        default:
            break;
    }
}
