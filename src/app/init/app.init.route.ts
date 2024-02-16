import { ComponentRef } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { filter } from 'rxjs';
import { AppComponent } from '../app.component';

export function bootstrapAppRouteFactory(router: Router): (appComponentRef: ComponentRef<AppComponent>) => void {
  return (appComponentRef: ComponentRef<AppComponent>) => {
    router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((routerEvent: RouterEvent) => {
      _navigationInterceptor(routerEvent, appComponentRef.instance);
    });
  }
}

function _navigationInterceptor(event: RouterEvent, appComponent: AppComponent): void {

  switch (event.constructor) {

    case NavigationEnd:
      appComponent.appLoadingComponent.loading = false
      break;

    case NavigationError:
    case NavigationCancel:
    case NavigationStart:
      appComponent.appLoadingComponent.loading = true
      break;

    default:
      break;

  }

}
