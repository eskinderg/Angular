import { Component, ChangeDetectionStrategy, viewChild, ElementRef } from '@angular/core';
import { Note } from '../../../models/note';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AdminNoteApiService } from 'src/app/admin/admin.notes.api.service';
import { EditNoteDialogComponent } from './edit.note.dialog/edit-note-dialog.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { NoteFilterService } from '../../services/note-filter.service';

@Component({
    selector: 'app-admin-dashboard-notes',
    templateUrl: 'admin.dashboard.component.html',
    styleUrls: ['admin.dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, CommonModule, EditNoteDialogComponent, FormsModule],
    providers: [AdminNoteApiService]
})
export class AdminDashboardComponent {
    allNotes$ = this.adminNoteApiService.Notes;
    searchTerm$ = new BehaviorSubject<string>('');
    selectedUserId$ = new BehaviorSubject<string>('');
    sortField$ = new BehaviorSubject<keyof Note | 'index'>('index');
    sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');

    selectUserElementRef = viewChild.required<ElementRef>('selectUser');
    selectUserIdElementRef = viewChild.required<ElementRef>('selectUserId');

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

    updateSelectedUser() {
        const user = this.selectUserElementRef().nativeElement;
        const userId = this.selectUserIdElementRef().nativeElement;
        const selectedIndex = user.selectedIndex;

        if (selectedIndex) {
            this.selectedUserId$.next(userId.options[selectedIndex].value);
        } else {
            this.selectedUserId$.next('');
        }
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
        this.selectUserElementRef().nativeElement.value = '0';
        this.selectedUserId$.next('');
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

    get Owners() {
        return this.adminNoteApiService.Users;
    }
}
