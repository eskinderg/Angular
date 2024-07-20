import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Renderer2
} from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteApiService } from '../../services/notes.api.service';

@Component({
    selector: 'app-note-detail-dialog',
    templateUrl: './note-dialog.component.html',
    styleUrl: './note-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDialogComponent implements OnInit, AfterViewInit {
    public note: Note;

    constructor(
        private notesApiService: NoteApiService,
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.renderer.listen(this.host.nativeElement, 'keydown.esc', () => {
            this.close();
        });
    }

    ngAfterViewInit(): void {
        (this.host.nativeElement.firstElementChild as HTMLElement).focus();
    }

    close() {
        this.host.nativeElement.remove();
    }

    no() {
        this.host.nativeElement.remove();
    }

    yes() {
        this.notesApiService.archiveNote(this.note);
        this.host.nativeElement.remove();
    }
}
