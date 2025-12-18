import {
    Component,
    ChangeDetectionStrategy,
    viewChild,
    OnDestroy,
    OnInit,
    inject,
    effect,
    ElementRef,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { NoteApiService } from '../../services/notes.api.service';
import { Note } from '../../../../models/note';
import { FadeInOutNoteListItem } from '../../../shared/animations/fadeInAndOutNoteListItem';
import { Router } from '@angular/router';
import { NoteRightViewComponent } from './right.view/note.right.view.component';
import { BehaviorSubject, combineLatest, interval, map, Subscription } from 'rxjs';
import { NOTE_REFRESH_INTERVAL } from 'src/app/config/config';
import { NoteLeftViewComponent } from './left.view/note.left.view.component';
import { AsyncPipe } from '@angular/common';
import { TextSelection } from './right.view/textAreaExpanded/text.selection';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
    selector: 'app-notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.scss', './../../scss/notes.colour.scss'],
    animations: [FadeInOutNoteListItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NoteLeftViewComponent, NoteRightViewComponent, AsyncPipe],
    providers: [TextSelection, NoteApiService]
})
export class NotesComponent implements OnDestroy, OnInit, AfterViewInit {
    public notesApiService = inject(NoteApiService);
    private notificationService = inject(NotificationService);
    private dialogService = inject(DialogService);
    private router = inject(Router);
    private renderer = inject(Renderer2);

    appNoteComponent = viewChild.required<NoteRightViewComponent>('appNote');
    container = viewChild.required<ElementRef<HTMLDivElement>>('container');
    leftPane = viewChild.required<ElementRef<HTMLDivElement>>('leftPane');
    refreshSubscription: Subscription;
    syncConflictSubscription: Subscription;
    refreshInterval = interval(NOTE_REFRESH_INTERVAL);
    searchTerm$ = new BehaviorSubject<string>('');

    private startX = 0;
    private startWidth = 0;
    private removeMouseMove?: () => void;
    private removeMouseUp?: () => void;

    private readonly MIN_LEFT_PERCENT = 15; // %
    private readonly MAX_LEFT_PERCENT = 50; // %
    private readonly STORAGE_KEY = 'notes-left-pane-width';

    filteredNotes$ = combineLatest([this.notesApiService.Notes, this.searchTerm$]).pipe(
        map(([notes, searchTerm]) => {
            return notes.filter((note) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(note.text, 'text/html');
                const matchesSearch = [note.header, doc.textContent]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                return matchesSearch;
            });
        })
    );

    constructor() {
        document.querySelector('.content').className += ' hide-scroll-bar';

        window.addEventListener('offline', () => {
            this.notificationService.showError(
                'Unable to connect to the internet. Please connect to the internet',
                'No internet connection available'
            );
        });

        effect((onCleanup) => {
            const sub = this.notesApiService.IsSyncConflict.subscribe((c) => {
                if (c) {
                    this.notificationService.showWarning(
                        "There are changes made that are not in sync with the server. Please reload your page to fetch the latest changes otherwise your changes won't be saved",
                        'Sync Operation',
                        5,
                        true,
                        false
                    );
                }
            });

            onCleanup(() => sub.unsubscribe());
        });

        this.notesApiService.syncNotes();
    }

    ngOnInit(): void {
        this.refreshSubscription = this.refreshInterval.subscribe(() => this.notesApiService.refreshNotes());
    }

    ngAfterViewInit(): void {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (!saved) return;

        const savedPx = Number(saved);
        if (Number.isNaN(savedPx)) return;

        const containerWidth = this.container().nativeElement.offsetWidth;

        const minPx = (this.MIN_LEFT_PERCENT / 100) * containerWidth;

        const maxPx = (this.MAX_LEFT_PERCENT / 100) * containerWidth;

        const safeWidth = Math.min(Math.max(savedPx, minPx), maxPx);

        this.container().nativeElement.style.setProperty(
            '--left-pane-width',
            `${(safeWidth / containerWidth) * 100}%`
        );

        this.renderer.setStyle(this.leftPane().nativeElement, 'flex', `0 0 ${safeWidth}px`);
    }

    onUpdateNote(note: Note) {
        this.notesApiService.updateNote(note);
    }

    onSyncNotes() {
        this.notesApiService.syncNotes();
    }

    onSelectNote(note: Note) {
        this.notesApiService.selectNote(note);
    }

    onSearchSelection(note: Note) {
        this.notesApiService.searchSelect(note);
    }

    onCreateNewNote(note: Note) {
        this.notesApiService.createNewNote(note);
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
                    this.notesApiService.updateNote({ ...note, archived: true, date_archived: new Date() });
                }
            });
    }

    onSyncNote() {
        this.notesApiService.syncNotes();
    }

    routeToArchivedNotes() {
        this.router.navigateByUrl('notes/archived');
    }

    hightlightText(note: Note, field: 'header' | 'text'): string {
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
            (match) => `<span class="highlighted-match"><strong>${match}</strong></span>`
        );

        return highlightedPreview;
    }

    private escapeRegExp(str: string): string {
        return str.replace(/[\\^$.|?*+()[{]/g, '\\$&');
    }

    ngOnDestroy(): void {
        document.querySelector('.content').classList.remove('hide-scroll-bar');
        if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
        if (this.syncConflictSubscription) this.syncConflictSubscription.unsubscribe();
        this.removeMouseMove?.();
        this.removeMouseUp?.();
    }

    startResize(event: MouseEvent): void {
        event.preventDefault();
        this.startX = event.clientX;
        this.startWidth = this.leftPane().nativeElement.offsetWidth;
        this.renderer.addClass(document.body, 'resizing');
        this.removeMouseMove = this.renderer.listen('document', 'mousemove', this.onMouseMove);
        this.removeMouseUp = this.renderer.listen('document', 'mouseup', this.stopResize);
    }

    private onMouseMove = (event: MouseEvent): void => {
        const dx = event.clientX - this.startX;
        const containerWidth = this.container().nativeElement.offsetWidth;

        let newWidthPx = this.startWidth + dx;

        // convert % → px
        const minPx = (this.MIN_LEFT_PERCENT / 100) * containerWidth;

        const maxPx = (this.MAX_LEFT_PERCENT / 100) * containerWidth;

        // enforce limits
        newWidthPx = Math.max(minPx, newWidthPx);
        newWidthPx = Math.min(maxPx, newWidthPx);

        this.container().nativeElement.style.setProperty(
            '--left-pane-width',
            `${(newWidthPx / containerWidth) * 100}%`
        );

        this.renderer.setStyle(this.leftPane().nativeElement, 'flex', `0 0 ${newWidthPx}px`);
    };

    private stopResize = (): void => {
        this.renderer.removeClass(document.body, 'resizing');

        const width = this.leftPane().nativeElement.offsetWidth;
        localStorage.setItem(this.STORAGE_KEY, String(width));

        this.removeMouseMove?.();
        this.removeMouseUp?.();

        this.removeMouseMove = undefined;
        this.removeMouseUp = undefined;
    };
}
