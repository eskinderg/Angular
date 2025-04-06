import { Injectable, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogButtons } from './buttons.enum';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private viewContainerRef: ViewContainerRef;

    constructor(private injector: EnvironmentInjector) {}

    registerHost(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openDialog(title: string, message: string, buttons: DialogButtons): Promise<boolean | null> {
        if (!this.viewContainerRef) throw new Error('Dialog host not initialized');

        this.viewContainerRef.clear();

        const dialogRef = this.viewContainerRef.createComponent(DialogComponent, {
            environmentInjector: this.injector
        });

        dialogRef.setInput('title', title);
        dialogRef.setInput('message', message);
        dialogRef.setInput('buttons', buttons);

        return new Promise((resolve) => {
            dialogRef.instance.closed.subscribe((result) => {
                dialogRef.destroy();
                resolve(result);
            });
        });
    }
}
