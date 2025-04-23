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

@Component({
    selector: 'app-admin-dashboard-notes',
    templateUrl: 'admin.dashboard.component.html',
    styleUrls: ['admin.dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, CommonModule, EditNoteDialogComponent, FormsModule, BulkUpdateDialogComponent],
    providers: [AdminNoteApiService]
})
export class AdminDashboardComponent {
    allNotes$ = this.adminNoteApiService.Notes;
    searchTerm$ = new BehaviorSubject<string>('');
    selectedUserId$ = new BehaviorSubject<string>('');
    sortField$ = new BehaviorSubject<keyof Note | 'index'>('index');
    sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');
    selectedNotes$ = new BehaviorSubject<Note[]>([]);

    selectedNotes: Note[] = [];
    showBulkUpdateDialog: boolean = false;

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

        // Update the selected user ID
        this.selectedUserId$.next(selectedUserId);

        // Synchronize selectedNotes with the filtered notes
        this.filteredNotes$.subscribe((notes) => {
            const visibleNoteIds = notes.map((note) => note.id);
            const updatedSelectedNotes = this.selectedNotes$.value.filter((note) =>
                visibleNoteIds.includes(note.id)
            );
            this.selectedNotes$.next(updatedSelectedNotes);
        });
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

    onClick(note: Note) {
        this.adminNoteApiService.selectNote(note);
    }

    onClose() {
        this.adminNoteApiService.unSelectNote();
    }

    onSaved(note: Note) {
        this.adminNoteApiService.updateNote(note);
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
        if (checkbox.checked) {
            this.selectedNotes.push(note);
        } else {
            this.selectedNotes = this.selectedNotes.filter((n) => n.id !== note.id);
        }
    }

    isNoteSelected(note: Note): boolean {
        // if(this.selectedUserId$.value)
        //     debugger;
        return this.selectedNotes.some((n) => n.id === note.id);
    }

    toggleSelectAll(event: Event) {
        const checkbox = event.target as HTMLInputElement;

        // Subscribe to filteredNotes$ to get the currently visible notes
        this.filteredNotes$.subscribe((notes) => {
            if (checkbox.checked) {
                // Add all visible notes to selectedNotes
                this.selectedNotes = [...notes];
            } else {
                // Clear the selectedNotes array
                this.selectedNotes = [];
            }
        });
    }

    areAllNotesSelected(): boolean {
        let allSelected = false;

        // Subscribe to filteredNotes$ to check if all visible notes are selected
        this.filteredNotes$.subscribe((notes) => {
            allSelected = notes.length > 0 && notes.every((note) => this.isNoteSelected(note));
        });

        return allSelected;
    }

    openBulkUpdateDialog() {
        this.showBulkUpdateDialog = true;
    }

    closeBulkUpdateDialog() {
        this.showBulkUpdateDialog = false;
    }

    applyBulkUpdate(changes: { owner: string; userId: string; active: boolean | null }) {
        const updatedNotes = this.selectedNotes.map((note) => ({
            ...note,
            owner: changes.owner || note.owner,
            userId: changes.userId || note.userId,
            active: changes.active !== null ? changes.active : note.active
        }));

        // console.log(updatedNotes); // Log the updated notes for debugging
        this.adminNoteApiService.bulkUpdateNotes(updatedNotes);
        this.selectedNotes = []; // Clear the selection after update
        this.closeBulkUpdateDialog();

        // Uncomment the following lines to send the updated notes to the API
        // this.adminNoteApiService.bulkUpdateNotes(updatedNotes).subscribe(() => {
        //     this.selectedNotes = []; // Clear the selection after update
        //     this.adminNoteApiService.refreshNotes(); // Refresh the notes list
        // });
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

    get Owners(): Observable<[string, string, number][]> {
        return this.adminNoteApiService.Users;
    }
}
