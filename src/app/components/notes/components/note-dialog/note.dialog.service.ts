import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent } from '@angular/core';
import { NoteDialogComponent } from './note-dialog.component';
import { Note } from 'src/app/models/note';

@Injectable({
    providedIn: 'root'
})
export class NoteDialogService {
    private noteModalComponentRef: ComponentRef<NoteDialogComponent>;

    constructor(
        public appRef: ApplicationRef,
        public injector: Injector
    ) {}

    showDialog(note: Note) {
        const rootElement = this.appRef.components[0].location.nativeElement;

        this.noteModalComponentRef = createComponent(NoteDialogComponent, {
            environmentInjector: this.appRef.injector
        });

        this.noteModalComponentRef.instance.note = note;

        this.appRef.attachView(this.noteModalComponentRef.hostView);

        rootElement.append(this.noteModalComponentRef.location.nativeElement);
    }

    destroy() {
        if (this.noteModalComponentRef) {
            this.noteModalComponentRef.destroy();
        }
    }
}
