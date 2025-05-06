import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Note } from '../../../models/note';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AdminNoteApiService } from 'src/app/admin/admin.notes.api.service';
import { EditNoteDialogComponent } from './edit.note.dialog/edit-note-dialog.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { NoteFilterService } from '../../services/note-filter.service';
import { BulkUpdateDialogComponent } from './bulk-update-dialog/bulk-update-dialog.component';
import { SelectedNotesDialogComponent } from './selected-notes-dialog.component/selected-notes-dialog.component';

@Component({
    selector: 'app-admin-dashboard-notes',
    templateUrl: 'admin.dashboard.component.html',
    styleUrls: ['admin.dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        CommonModule,
        SelectedNotesDialogComponent,
        EditNoteDialogComponent,
        FormsModule,
        BulkUpdateDialogComponent
    ],
    providers: [AdminNoteApiService]
})
export class AdminDashboardComponent {
    allNotes$ = this.adminNoteApiService.Notes;
    searchTerm$ = new BehaviorSubject<string>('');
    selectedUserId$ = new BehaviorSubject<string>('');
    sortField$ = new BehaviorSubject<keyof Note | 'index'>('index');
    sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');

    selectedNotes$ = new BehaviorSubject<Note[]>([]);
    showBulkUpdateDialog: boolean = false;
    showSelectedNotesDialog: boolean = false;

    constructor(
        public adminNoteApiService: AdminNoteApiService,
        public noteFilterService: NoteFilterService
    ) {}

    filteredNotes$ = combineLatest([
        this.allNotes$,
        this.searchTerm$,
        this.selectedUserId$,
        this.sortField$,
        this.sortDirection$
    ]).pipe(
        map(([notes, searchTerm, userId, sortField, sortDirection]) => {
            const filtered = this.noteFilterService.filterNotes(notes, searchTerm, userId);
            return this.noteFilterService.sortNotes(filtered, sortField, sortDirection);
        })
    );

    updateSelectedUser(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedUserId = selectElement.value;

        this.selectedUserId$.next(selectedUserId);
    }

    onSearchInput(event: any) {
        const element = event.currentTarget as HTMLInputElement;
        const value = element.value;
        this.searchTerm$.next(value);
    }

    updateSort(field: keyof Note | 'index') {
        const currentField = this.sortField$.value;
        const currentDirection = this.sortDirection$.value;

        if (currentField === field) {
            // Cycle through 'asc' -> 'desc' -> clear (null)
            if (currentDirection === 'asc') {
                this.sortDirection$.next('desc');
            } else if (currentDirection === 'desc') {
                this.sortField$.next(null); // Clear the sort field
                this.sortDirection$.next(null); // Clear the sort direction
            } else {
                this.sortDirection$.next('asc');
            }
        } else {
            // Set new sort field and default to 'asc'
            this.sortField$.next(field);
            this.sortDirection$.next('asc');
        }
    }

    trackByFn(index: number, item: Note): string {
        return `${index}-${item.id}-${item.userId}`;
    }

    onClick(note: Note) {
        this.adminNoteApiService.selectNote(note);
    }

    onClose() {
        this.adminNoteApiService.unSelectNote();
    }

    onSaved(note: Note) {
        this.adminNoteApiService.bulkUpdateNotes([note]);
    }

    clearSearch() {
        this.searchTerm$.next('');
    }

    clearFilter() {
        this.clearSearch();
        this.selectedUserId$.next('');
    }

    toggleNoteSelection(note: Note, event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const currentSelectedNotes = this.selectedNotes$.value;

        if (checkbox.checked) {
            this.selectedNotes$.next([...currentSelectedNotes, note]);
        } else {
            this.selectedNotes$.next(currentSelectedNotes.filter((n) => n.id !== note.id));
        }
    }

    isNoteSelected(note: Note): boolean {
        // if(this.selectedUserId$.value)
        //     debugger;
        return this.selectedNotes$.value.some((n) => n.id === note.id);
    }

    toggleSelectAll(event: Event) {
        const checkbox = event.target as HTMLInputElement;

        const sub = this.filteredNotes$.subscribe((notes) => {
            if (checkbox.checked) {
                notes.forEach((note) => {
                    if (!this.selectedNotes$.value.some((n) => n.id === note.id)) {
                        this.selectedNotes$.next([...this.selectedNotes$.value, note]);
                    }
                });
            } else {
                // Remove all visible notes from selectedNotes
                this.selectedNotes$.next(
                    this.selectedNotes$.value.filter(
                        (note) => !notes.some((visibleNote) => visibleNote.id === note.id)
                    )
                );
            }
        });
        sub.unsubscribe();
    }

    areAllNotesSelected(): boolean {
        let allSelected = false;

        const sub = this.filteredNotes$.subscribe((notes) => {
            allSelected = notes.length > 0 && notes.every((note) => this.isNoteSelected(note));
        });

        sub.unsubscribe();

        return allSelected;
    }

    trackByUserId(
        index: number,
        user: { owner: string; user_id: string; total_notes: number; active_notes: number }
    ) {
        return user.user_id;
    }

    openSelectedNotesDialog() {
        this.showSelectedNotesDialog = true;
    }

    closeSelectedNotesDialog() {
        this.showSelectedNotesDialog = false;
    }

    openBulkUpdateDialog() {
        this.showBulkUpdateDialog = true;
    }

    closeBulkUpdateDialog() {
        this.showBulkUpdateDialog = false;
    }

    applyBulkUpdate(changes: {
        owner: string;
        userId: string;
        active: boolean | null;
        colour: string | null;
    }) {
        const updatedNotes = this.selectedNotes$.value.map((note) => ({
            ...note,
            owner: changes.owner || note.owner,
            userId: changes.userId || note.userId,
            active: changes.active ?? note.active,
            colour: changes.colour || note.colour
        }));

        this.adminNoteApiService.bulkUpdateNotes(updatedNotes);
        this.selectedNotes$.next([]); // Clear the selection after update
        this.closeBulkUpdateDialog();
        this.closeSelectedNotesDialog(); // Close the selected notes dialog
    }

    get TotalNotesCount() {
        return this.adminNoteApiService.TotalNotesCount;
    }

    get SelectedNote(): Observable<Note> {
        return this.adminNoteApiService.SelectedNote;
    }

    get Notes() {
        return this.adminNoteApiService.Notes;
    }

    get Owners(): Observable<
        { owner: string; user_id: string; total_notes: number; active_notes: number }[]
    > {
        return this.adminNoteApiService.Users;
    }
}
