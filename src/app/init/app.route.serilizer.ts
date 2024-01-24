import { RouterStateSerializer } from "@ngrx/router-store";
import { ActivatedRouteSnapshot, Data, RouterStateSnapshot } from "@angular/router";
import { AppRouterState } from "../reducers/route.reducer";

export class CustomSerializer implements RouterStateSerializer<AppRouterState> {
  serialize(routerState: RouterStateSnapshot): AppRouterState {

    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams }, } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const mergeRouteData = (route: ActivatedRouteSnapshot): Data =>
  !route
    ? {}
    : {
      ...route.data,
      ...mergeRouteData(
        (route.children.find(({ outlet }) => outlet === 'primary') || route.firstChild) as ActivatedRouteSnapshot
      ),
    };
