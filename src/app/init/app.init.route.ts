import { ComponentRef, ElementRef, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { filter } from 'rxjs';
import { AppComponent } from '../app.component';

export function bootstrapAppRouteFactory(router: Router, ngZone: NgZone, rendererFactory: RendererFactory2): (appComponentRef: ComponentRef<AppComponent>) => void {
  return (appComponentRef: ComponentRef<AppComponent>) => {
    let renderer: Renderer2 = rendererFactory.createRenderer(null, null);
    router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      _navigationInterceptor(e, renderer, ngZone, appComponentRef.instance.spinnerElement);
    });
  }
}

function _navigationInterceptor(event: RouterEvent, renderer: Renderer2, ngZone: NgZone, spinnerElement: ElementRef): void {

  switch (event.constructor) {

    case NavigationCancel:
    case NavigationEnd:
    case NavigationError:
      setSpinner(ngZone, renderer, spinnerElement, false);
      break;

    case NavigationStart:
      setSpinner(ngZone, renderer, spinnerElement, true);
      break;

    default:
      break;

  }

}

function setSpinner(ngZone: NgZone, renderer: Renderer2, spinnerElement: ElementRef, visible: Boolean): void {
  ngZone.runOutsideAngular(() => {
    renderer.setStyle(spinnerElement.nativeElement, 'opacity', visible ? "1" : "0");
  });
}
