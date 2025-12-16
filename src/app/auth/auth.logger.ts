import { Injectable, inject } from '@angular/core';
import { OAuthLogger } from 'angular-oauth2-oidc';
import { NotificationService } from '../shared/notification/notification.service';

@Injectable()
export class OAuthAppLogger extends OAuthLogger {
    notificationService = inject(NotificationService);

    override debug(_message?: any, ..._optionalParams: any[]): void {
        // console.info(optionalParams);
        // this.notificationService.showStandard(message, 'OAuth Debug');
    }

    override info(message?: any, ..._optionalParams: any[]): void {
        // console.log(optionalParams);
        this.notificationService.showStandard(message, 'OAuth Info');
    }

    override log(message?: any, ..._optionalParams: any[]): void {
        // console.log(optionalParams);
        this.notificationService.showSuccess(message, 'OAuth Log');
    }

    override warn(message?: any, ..._optionalParams: any[]): void {
        // console.log(optionalParams);
        this.notificationService.showSuccess(message, 'OAuth Warn');
    }

    override error(_message?: any, ..._optionalParams: any[]): void {
        // console.log(optionalParams);
        // this.notificationService.showError(message, 'OAuth Error');
    }
}
