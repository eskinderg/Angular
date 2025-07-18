import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
// import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggingService } from './loggingservice';
// import { OAuthService } from 'angular-oauth2-oidc';

// import * as StackTrace from 'stacktrace-js';
/**
 * Global error handler class
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private injector = inject(Injector);

    /**
     * @param {Injector} injector - service for injecting LoggingService
     */
    constructor() {
        window.addEventListener('error', (event) => {
            this.handleError(event.error);
            event.preventDefault();
        });
    }

    /**
     * Handles error
     * @param {error} error - error thrown
     */
    handleError(error: any) {
        const loggingService = this.injector.get(LoggingService);
        // const location = this.injector.get(LocationStrategy);
        // const message = error.message ? error.message : error.toString();
        // const url = location instanceof PathLocationStrategy ? location.path() : '';

        loggingService.error(error);

        // get the stack trace, lets grab the last 10 stacks only
        // StackTrace.fromError(error).then(stackframes => {
        //   const stackString = stackframes
        //     .splice(0, 20)
        //     .map(function(sf) {
        //       return sf.toString();
        //     }).join('\n');

        // log on the server
        // loggingService.log({ message, url, stack: stackString });
        // });
        // console.log(url + ' \n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-Globally Handled Error ->>>>>>>>>>>>>>>>>>>>>>>>>>>');

        throw error;
    }
}
