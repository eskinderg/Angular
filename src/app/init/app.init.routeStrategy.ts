import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from "@angular/router";

export class AppRouteReuseStrategy implements BaseRouteReuseStrategy {
  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }
  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return !future.data['alwaysRefresh'];
    } else {
      return false;
    }
  }
  store(_route: ActivatedRouteSnapshot, _handle: DetachedRouteHandle | null): void {
  }
}
