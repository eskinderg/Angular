import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    viewChild
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Subscription, tap } from 'rxjs';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-note-header-control',
    templateUrl: './note.header.control.component.html',
    styleUrl: './note.header.control.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NoteHeaderControlComponent implements OnInit, OnDestroy {
    @Input() note: Note;
    @Output() noteUpdateNoteHeader: EventEmitter<Note> = new EventEmitter<Note>();

    subscription: Subscription | undefined;

    inputHeaderRef = viewChild.required<ElementRef>('inputHeaderRef');

    constructor() {}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = fromEvent(this.inputHeaderRef().nativeElement, 'input')
            .pipe(
                filter(Boolean),
                debounceTime(450),
                distinctUntilChanged(),
                tap(() => {
                    this.noteUpdateNoteHeader.emit({
                        ...this.note,
                        header: this.inputHeaderRef().nativeElement.value
                    } as Note);
                })
            )
            .subscribe();
    }
}
