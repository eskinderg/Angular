import { Component, ChangeDetectionStrategy, viewChild, OnDestroy, OnInit, inject } from '@angular/core';
import { NoteApiService } from '../services/notes.api.service';
import { Note } from '../../../models/note';
import { FadeInOutNoteListItem } from '../../shared/animations/fadeInAndOutNoteListItem';
import { Router } from '@angular/router';
import { NoteRightViewComponent } from './right.view/note.right.view.component';
import { BehaviorSubject, combineLatest, interval, map, Subscription } from 'rxjs';
import { NOTE_REFRESH_INTERVAL } from 'src/app/config/config';
import { NoteLeftViewComponent } from './left.view/note.left.view.component';
import { AsyncPipe } from '@angular/common';
import { TextSelection } from './right.view/textAreaExpanded/text.selection';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';

@Component({
    selector: 'app-notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.scss', './../scss/notes.colour.scss'],
    animations: [FadeInOutNoteListItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NoteLeftViewComponent, NoteRightViewComponent, AsyncPipe],
    providers: [TextSelection, NoteApiService]
})
export class NotesComponent implements OnDestroy, OnInit {
    public notesApiService = inject(NoteApiService);
    private dialogService = inject(DialogService);
    private router = inject(Router);

    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');
    refreshSubscription: Subscription;
    refreshInterval = interval(NOTE_REFRESH_INTERVAL);
    searchTerm$ = new BehaviorSubject<string>('');

    filteredNotes$ = combineLatest([this.notesApiService.Notes, this.searchTerm$]).pipe(
        map(([notes, searchTerm]) => {
            return notes.filter((note) => {
                const div = document.createElement('div');
                div.innerHTML = note.text;
                const matchesSearch = [note.header, div.textContent]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                return matchesSearch;
            });
        })
    );

    constructor() {
        document.querySelector('.content').className += ' hide-scroll-bar';
    }

    ngOnInit(): void {
        this.refreshSubscription = this.refreshInterval.subscribe(() => this.notesApiService.refreshNotes());
    }

    onChangeNoteText(note: Note) {
        this.notesApiService.updateNoteText(note);
    }

    onSelectionChange(note: Note) {
        this.notesApiService.updateNoteSelection(note);
    }

    onToggleSpellCheck(note: Note) {
        this.notesApiService.toggleSpellCheck(note);
        this.appNoteComponent().textAreaExpandedComponent().textAreaElementRef().nativeElement.focus();
    }

    onSelectNote(note: Note) {
        this.notesApiService.selectNote(note);
    }

    onCreateNewNote(note: Note) {
        this.notesApiService.createNewNote(note);
    }

    onUpdatePinOrder(note: Note) {
        this.notesApiService.updateNotePinOrder(note);
    }

    onUpdateNoteColour(note: Note) {
        this.notesApiService.updateNoteColour(note);
    }

    onArchiveNote(note: Note) {
        this.dialogService
            .openDialog(
                'Archive Note',
                'Do you want to archive this note?',
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.TRASH
            )
            .then((result) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.notesApiService.archiveNote(note);
                }
            });
    }

    onUpdateNoteHeader(note: Note) {
        this.notesApiService.updateNoteHeader(note);
    }

    routeToArchivedNotes() {
        this.router.navigateByUrl('notes/archived');
    }

    hightlightText(note: Note, field: 'header' | 'text'): string {
        // const div = document.createElement('div');
        // div.innerHTML = note.text;

        const parser = new DOMParser();
        const doc = parser.parseFromString(note.text, 'text/html');

        const content = field === 'header' ? note.header : doc.body.textContent || '';
        const searchTerm = this.searchTerm$.value.toLowerCase();
        const combinedText = [content].join(' ');

        if (field === 'header' && (content === '' || content === null)) return 'Untitled';

        const index = combinedText.toLowerCase().indexOf(searchTerm);

        if (index === -1) {
            return content; // Return if no match is found
        }

        const previewStart = Math.max(0, index - 40); // Show 20 characters before the match
        const previewEnd = Math.min(combinedText.length, index + searchTerm.length + 100); // Show 20 characters after the match
        const preview = combinedText.substring(previewStart, previewEnd);

        const highlightedPreview = preview.replace(
            new RegExp(this.escapeRegExp(searchTerm), 'gi'),
            (match) => `<mark><strong>${match}</strong></mark>`
        );

        return highlightedPreview;
    }

    private escapeRegExp(str: string): string {
        return str.replace(/[\\^$.|?*+()[{]/g, '\\$&');
    }

    ngOnDestroy(): void {
        document.getElementsByClassName('content')[0].classList.remove('hide-scroll-bar');
        if (this.refreshSubscription != null) this.refreshSubscription.unsubscribe();
    }
}
