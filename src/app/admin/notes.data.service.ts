import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { User } from './models/user';

const NOTES_API_URL = '/api/admin/notes'; // Use the proxy path

@Injectable({ providedIn: 'root' })
export class AdminNotesDataService {
    http = inject(HttpClient);

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(NOTES_API_URL);
    }

    getUsersInfo(): Observable<
        { owner: string; user_id: string; total_notes: number; active_notes: number }[]
    > {
        return this.http.get<{ owner: string; user_id: string; total_notes: number; active_notes: number }[]>(
            NOTES_API_URL + '/usersinfo'
        );
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(NOTES_API_URL + '/users');
    }

    bulkUpdateUsers(payload: User[]): Observable<User[]> {
        return this.http
            .post(NOTES_API_URL + '/users', payload)
            .pipe(map((response: User[]) => response.map((user) => new User(user))));
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

    bulkUpdateNotes(payload: Note[]): Observable<Note[]> {
        return this.http
            .put(NOTES_API_URL + '/update', payload)
            .pipe(map((response: Note[]) => response.map((note) => new Note(note))));
    }
}
