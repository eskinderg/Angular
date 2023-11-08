import { APP_INITIALIZER, Provider, APP_BOOTSTRAP_LISTENER, RendererFactory2, NgZone, ErrorHandler } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store, } from "@ngrx/store"
import { OAuthService } from "angular-oauth2-oidc";
import { LoggingService } from "./error/loggingservice";
import { ToastService } from "./shared/toast/toast.service";
import { initializePreference } from "./init/app.init.preference";
import { initializeAuth } from "./init/app.init.auth";
import { bootstrapAppRouteFactory } from "./init/app.init.route";
import { initializeToast } from "./init/app.init.toast";
import { GlobalErrorHandler } from "./error/errorhandle";
import { AuthJWT } from "./auth/auth.JWT";
import { HttpErrorInterceptor } from "./error/http.error.interceptor";

export const APP_INIT : Provider[] = [
  {
    provide           : APP_BASE_HREF,
    useValue          : '/'
  },
  {
    provide           : HTTP_INTERCEPTORS,
    useClass          : AuthJWT,
    multi             : true
  },
  {
    provide           : HTTP_INTERCEPTORS,
    useClass          : HttpErrorInterceptor,
    multi             : true
  },
  {
    provide           : ErrorHandler,
    useClass          : GlobalErrorHandler
  },
  {
    provide           : APP_INITIALIZER,
    useFactory        : initializePreference,
    deps              : [Store],
    multi             : true
  },
  {
    provide           : APP_INITIALIZER,
    useFactory        : initializeAuth,
    deps              : [OAuthService, Store],
    multi             : true
  },
  {
    provide           : APP_INITIALIZER,
    useFactory        : initializeToast,
    deps              : [LoggingService, ToastService],
    multi             : true
  },
  {
    provide           : APP_BOOTSTRAP_LISTENER,
    useFactory        : bootstrapAppRouteFactory,
    deps              : [Router, NgZone, RendererFactory2],
    multi             : true
  }
]
