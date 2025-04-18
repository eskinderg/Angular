import { Component, ChangeDetectionStrategy, viewChild, ElementRef } from '@angular/core';
import { Note } from '../../../models/note';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NoteApiService } from 'src/app/components/notes/services/notes.api.service';
import { AdminNoteApiService } from '../../admin.notes.api.service';
import { EditNoteDialogComponent } from './edit.note.dialog/edit-note-dialog.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-dashboard-notes',
    templateUrl: 'admin.dashboard.component.html',
    styleUrls: ['admin.dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, CommonModule, EditNoteDialogComponent, FormsModule],
    providers: [AdminNoteApiService, NoteApiService]
})
export class AdminDashboardComponent {
    allNotes$ = this.adminNoteApiService.Notes;
    searchTerm$ = new BehaviorSubject<string>('');
    selectedUserId$ = new BehaviorSubject<string>('');
    sortField$ = new BehaviorSubject<keyof Note | 'index'>('index');
    sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');
    sortField: keyof Note | 'index' = 'index';
    sortDirection: 'asc' | 'desc' = 'asc';

    selectUserElementRef = viewChild.required<ElementRef>('selectUser');
    selectUserIdElementRef = viewChild.required<ElementRef>('selectUserId');

    constructor(public adminNoteApiService: AdminNoteApiService) {}

    filteredNotes$ = combineLatest([
        this.allNotes$,
        this.searchTerm$,
        this.sortField$,
        this.sortDirection$,
        this.selectedUserId$
    ]).pipe(
        map(([notes, term, field, direction, userId]) => {
            const searchText = term.toLowerCase();
            console.log(userId);

            return (
                [...notes]
                    .filter((note) => (userId ? note.userId === userId : note))
                    // .filter((note) => Object.values(note).join(' ').toLowerCase().includes(searchText))
                    .filter((note) => {
                        if (searchText) {
                            if (note.text) return note.text.toLowerCase().includes(searchText);
                            if (note.header) return note.header.toLowerCase().includes(searchText);
                            return false;
                        }
                        return true;
                    })
                    .sort((a, b) => {
                        const getValue = (note: Note) =>
                            field === 'index' ? notes.indexOf(note) : note[field];

                        let valA = getValue(a);
                        let valB = getValue(b);

                        const isEmpty = (val: any) => val === null || val === undefined || val === '';

                        if (isEmpty(valA) && isEmpty(valB)) return 0;
                        if (isEmpty(valA)) return 1;
                        if (isEmpty(valB)) return -1;

                        if (typeof valA === 'string') valA = valA.toLowerCase();
                        if (typeof valB === 'string') valB = valB.toLowerCase();

                        return direction === 'asc'
                            ? valA > valB
                                ? 1
                                : valA < valB
                                  ? -1
                                  : 0
                            : valA < valB
                              ? 1
                              : valA > valB
                                ? -1
                                : 0;
                    })
            );
        })
    );

    updateSelectOption() {
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

    sortBy(field: keyof Note | 'index') {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        this.sortField$.next(this.sortField);
        this.sortDirection$.next(this.sortDirection);
        const currentField = this.sortField$.value;
        const currentDirection = this.sortDirection$.value;

        if (currentField === field) {
            this.sortDirection$.next(currentDirection === 'asc' ? 'desc' : 'asc');
        } else {
            this.sortField$.next(field);
            this.sortDirection$.next('asc');
        }
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
