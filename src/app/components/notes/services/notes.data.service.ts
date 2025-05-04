import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note';

const NOTES_API_URL = environment.NOTES_API_URL;

@Injectable({ providedIn: 'root' })
export class NotesDataService {
    constructor(public http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(NOTES_API_URL);
    }

    getNote(id: number): Observable<Note> {
        return this.http.get<Note>(`${NOTES_API_URL}/${id}`);
    }

    addNote(note: Note): Observable<Note> {
        return this.http.post<Note>(NOTES_API_URL, note);
    }

    deleteNote(note: Note): Observable<Note> {
        return this.http.delete<Note>(`${NOTES_API_URL}/${note.id}`);
    }

    upsertNotes(notes: Note[]): Observable<Note[]> {
        return this.http.put<Note[]>(`${NOTES_API_URL}/update`, notes);
    }
}
