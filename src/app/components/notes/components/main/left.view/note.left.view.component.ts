import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    viewChild,
    inject,
    EventEmitter,
    Output,
    OnDestroy
} from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteApiService } from '../../../services/notes.api.service';
import { Store } from '@ngrx/store';
import * as fromNotes from 'src/app/store/reducers/note.reducer';
import { Router } from '@angular/router';
import { NoteRightViewComponent } from '../right.view/note.right.view.component';
import { v4 as uuidv4 } from 'uuid';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { AsyncPipe } from '@angular/common';
// import { FadeInOutNoteListItem } from 'src/app/components/shared/animations/fadeInAndOutNoteListItem';
import { BehaviorSubject, Observable } from 'rxjs';
import { SvgIconComponent } from 'src/app/components/shared/svg/svg.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-note-left-view',
    templateUrl: './note.left.view.component.html',
    styleUrls: ['./note.left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NoteListItemComponent, AsyncPipe, SvgIconComponent]
})
export class NoteLeftViewComponent implements OnDestroy {
    notesApiService = inject(NoteApiService);
    private noteStore = inject<Store<fromNotes.INotesState>>(Store);
    route = inject(Router);

    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');
    searchInputRef = viewChild.required<ElementRef<HTMLInputElement>>('search');

    @Input() searchTerm$: BehaviorSubject<string>;
    @Input() notes$: Observable<Note[]>;
    @Input() selectedNote$: Observable<Note>;
    @Input() isSyncing: boolean;

    @Output() archiveNote: EventEmitter<Note> = new EventEmitter();
    @Output() updateNote: EventEmitter<Note> = new EventEmitter();
    @Output() selectNote: EventEmitter<Note> = new EventEmitter();
    @Output() createNewNote: EventEmitter<Note> = new EventEmitter();
    @Output() syncNotes: EventEmitter<Note> = new EventEmitter();

    private authService = inject(AuthService);

    searchVisible: boolean = false;
    private timeoutId: any;

    showSearch() {
        this.searchVisible = true;
        this.timeoutId = setTimeout(() => this.searchInputRef().nativeElement.focus(), 0);
    }

    onSearchInput(event: any) {
        const value = (event.currentTarget as HTMLInputElement).value;
        if (value.length) this.notesApiService.unselectNote();
        this.searchTerm$.next(value);
    }

    onSearchInputFocus(event: any) {
        this.onSearchInput(event);
    }

    clearSearch() {
        this.searchVisible = false;
        this.searchTerm$.next('');
    }

    onSelectNote(note: Note) {
        this.selectNote.emit(note);
    }

    onCreateNewNote() {
        this.createNewNote.emit({
            ...new Note(),
            note_id: uuidv4(),
            text: '',
            header: '',
            pinned: false,
            active: true,
            archived: false,
            sync: false,
            readonly: false,
            date_modified: new Date(),
            local_date_modified: new Date(),
            pin_order: new Date().getTime(),
            user_id: this.authService.getUserId()
        });
    }

    onUpdateNote(note: Note) {
        this.updateNote.emit(note);
    }

    onArchiveNote(note: Note) {
        this.archiveNote.emit(note);
    }

    onSyncNotes() {
        this.syncNotes.emit();
    }

    routeToArchivedNotes() {
        this.route.navigateByUrl('notes/archived');
    }

    get Animate() {
        return this.notesApiService.NoteAnimateState;
    }

    get NoteLoading() {
        return this.noteStore.select(fromNotes.getIsNoteLoading);
    }

    get NotesCount() {
        return this.notesApiService.NotesLength;
    }

    ngOnDestroy(): void {
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }
}
