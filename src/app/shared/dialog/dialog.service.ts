import { Injectable, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DIALOG_TYPE } from './buttons.enum';
import { DIALOG_RESPONSE } from './response.enum';
import { DIALOG_SIGNS } from './dialog.sign.enum';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private viewContainerRef: ViewContainerRef;

    constructor(private injector: EnvironmentInjector) {}

    registerHost(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openDialog(
        title: string,
        message: string,
        dialogType: DIALOG_TYPE,
        showBackDrop: boolean = true,
        sign: DIALOG_SIGNS = null
    ): Promise<DIALOG_RESPONSE | null> {
        if (!this.viewContainerRef) throw new Error('Dialog host not initialized');

        this.viewContainerRef.clear();

        const dialogRef = this.viewContainerRef.createComponent(DialogComponent, {
            environmentInjector: this.injector
        });

        dialogRef.setInput('title', title);
        dialogRef.setInput('message', message);
        dialogRef.setInput('dialogType', dialogType);
        dialogRef.setInput('showBackDrop', showBackDrop);
        dialogRef.setInput('sign', sign);

        return new Promise((resolve) => {
            dialogRef.instance.closed.subscribe((result: DIALOG_RESPONSE) => {
                dialogRef.destroy();
                resolve(result);
            });
        });
    }
}
