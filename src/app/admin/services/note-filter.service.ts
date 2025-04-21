import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';

@Injectable({
    providedIn: 'root'
})
export class NoteFilterService {
    filterNotes(notes: Note[], searchTerm: string, userId: string): Note[] {
        const searchText = searchTerm.toLowerCase();

        return notes.filter((note) => {
            const matchesUser = userId ? note.userId === userId : true;
            const matchesSearch = [note.header, note.text].join(' ').toLowerCase().includes(searchText);
            return matchesUser && matchesSearch;
        });
    }

    sortNotes(notes: Note[], field: keyof Note | 'index' | null, direction: 'asc' | 'desc' | null): Note[] {
        if (!field || !direction) {
            // If no sort field or direction, return the notes as-is
            return notes;
        }

        return [...notes].sort((a, b) => {
            const getValue = (note: Note) => (field === 'index' ? notes.indexOf(note) : note[field]);

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
        });
    }
}
