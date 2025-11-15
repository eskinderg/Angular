import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note';

const NOTES_API_URL = environment.NOTES_API_URL;

@Injectable({ providedIn: 'root' })
export class NotesDataService {
    http = inject(HttpClient);

    getNotes(): Observable<Note[]> {
        return this.http
            .get<Note[]>(NOTES_API_URL)
            .pipe(map((r) => r.map((n) => new Note({ ...n, sync: true }))));
    }

    getNote(id: number): Observable<Note> {
        return this.http.get<Note>(`${NOTES_API_URL}/${id}`);
    }

    addNote(note: Note): Observable<Note> {
        return this.http.post<Note>(NOTES_API_URL, note);
    }

    deleteNote(note: Note): Observable<Note> {
        return this.http.delete<Note>(`${NOTES_API_URL}/${note.note_id}`);
    }

    upsertNotes(notes: Note[]): Observable<Note[]> {
        return this.http.put<Note[]>(`${NOTES_API_URL}/update`, notes);
    }
}
