import { Injectable } from '@angular/core';
import { OAuthLogger } from 'angular-oauth2-oidc';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class OAuthAppLogger extends OAuthLogger {
  constructor(public logg: ToastService) {
    super();
  }

  override debug(message?: any, ...optionalParams: any[]): void {
    console.info(optionalParams);
    this.logg.showSuccess(message, 'OAuth Debug');
  }
  override info(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Info');
  }
  override log(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Log');
  }
  override warn(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Warn');
  }
  override error(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Error');
  }
}
