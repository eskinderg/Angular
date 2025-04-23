import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note';

const NOTES_API_URL = '/api/admin/notes'; // Use the proxy path

@Injectable({ providedIn: 'root' })
export class AdminNotesDataService {
    bulkUpdateNotes(payload: Note[]): Observable<Note[]> {
        return of(payload);
    }
    constructor(public http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(NOTES_API_URL);
    }

    getUsers(): Observable<[string, string, number][]> {
        return this.http.get<[string, string, number][]>(NOTES_API_URL + '/users');
    }

    getNote(id: number) {
        return this.http.get<Note>(NOTES_API_URL + id);
    }

    addNote(note: Note): Observable<Note> {
        return this.http.post<Note>(NOTES_API_URL, note);
    }

    deleteNote(note: Note): Observable<Note> {
        return this.http.delete(NOTES_API_URL + note.id).pipe(map((_response) => new Note(_response)));
    }

    addOrUpdateNote(note: Note): Observable<Note> {
        return this.http
            .post(NOTES_API_URL, JSON.stringify(note))
            .pipe(map((response) => new Note(response)));
    }

    updateNote(note: Note): Observable<Note> {
        return this.http.put(NOTES_API_URL, note).pipe(map((response) => new Note(response)));
    }
}
