import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent } from '@angular/core';
import { EventDialogComponent } from './event-dialog.component';
import { Event } from 'src/app/models/event';

@Injectable({
    providedIn: 'root'
})
export class EventDialogService {
    private noteModalComponentRef: ComponentRef<EventDialogComponent>;

    constructor(
        public appRef: ApplicationRef,
        public injector: Injector
    ) {}

    showDialog(event: Event) {
        const rootElement = this.appRef.components[0].location.nativeElement;

        this.noteModalComponentRef = createComponent(EventDialogComponent, {
            environmentInjector: this.appRef.injector
        });

        this.noteModalComponentRef.instance.event = event;

        this.appRef.attachView(this.noteModalComponentRef.hostView);

        rootElement.append(this.noteModalComponentRef.location.nativeElement);
    }

    destroy() {
        if (this.noteModalComponentRef) {
            this.noteModalComponentRef.destroy();
        }
    }
}
