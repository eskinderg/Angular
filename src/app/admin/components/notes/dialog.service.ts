import { Injectable, EnvironmentInjector, ViewContainerRef, inject } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private injector = inject(EnvironmentInjector);

    private viewContainerRef: ViewContainerRef;

    registerHost(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    openConfirm(message: string): Promise<boolean> {
        if (!this.viewContainerRef) throw new Error('Dialog host not initialized');

        this.viewContainerRef.clear();

        const compRef = this.viewContainerRef.createComponent(ConfirmDialogComponent, {
            environmentInjector: this.injector
        });

        compRef.instance.message = message;

        return new Promise((resolve) => {
            compRef.instance.confirmed.subscribe((result: boolean) => {
                compRef.destroy();
                resolve(result);
            });
        });
    }
}
