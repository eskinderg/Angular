import { APP_INITIALIZER, Provider, APP_BOOTSTRAP_LISTENER, RendererFactory2, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Store, } from "@ngrx/store"
import { OAuthService } from "angular-oauth2-oidc";
import { LoggingService } from "./error/loggingservice";
import { ToastService } from "./shared/toast/toast.service";
import { initializePreference } from "./init/app.init.preference";
import { initializeAuth } from "./init/app.init.auth";
import { bootstrapAppRouteFactory } from "./init/app.init.route";
import { initializeToast } from "./init/app.init.toast";

export const APP_INIT: Provider[] = [
  {
    provide    : APP_INITIALIZER,
    useFactory : initializePreference,
    deps       : [Store],
    multi      : true
  },
  {
    provide    : APP_INITIALIZER,
    useFactory : initializeAuth,
    deps       : [OAuthService, Store],
    multi      : true
  },
  {
    provide    : APP_INITIALIZER,
    useFactory : initializeToast,
    deps       : [LoggingService, ToastService],
    multi      : true
  },
  {
    provide    : APP_BOOTSTRAP_LISTENER,
    useFactory : bootstrapAppRouteFactory,
    deps       : [Router, NgZone, RendererFactory2],
    multi      : true
  }
]
