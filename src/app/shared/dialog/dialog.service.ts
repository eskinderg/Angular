import { Injectable, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DIALOG_BUTTONS } from './buttons.enum';
import { DIALOG_RESULT } from './result.enum';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private viewContainerRef: ViewContainerRef;

    constructor(private injector: EnvironmentInjector) {}

    registerHost(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openDialog(title: string, message: string, buttons: DIALOG_BUTTONS): Promise<DIALOG_RESULT | null> {
        if (!this.viewContainerRef) throw new Error('Dialog host not initialized');

        this.viewContainerRef.clear();

        const dialogRef = this.viewContainerRef.createComponent(DialogComponent, {
            environmentInjector: this.injector
        });

        dialogRef.setInput('title', title);
        dialogRef.setInput('message', message);
        dialogRef.setInput('buttons', buttons);

        return new Promise((resolve) => {
            dialogRef.instance.closed.subscribe((result: DIALOG_RESULT) => {
                dialogRef.destroy();
                resolve(result);
            });
        });
    }
}
