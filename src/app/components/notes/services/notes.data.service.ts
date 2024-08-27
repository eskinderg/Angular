import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note';

const NOTES_API_URL = environment.NOTES_API_URL;

@Injectable()
export class NotesDataService {
    constructor(public http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(NOTES_API_URL);
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
        // const date = new Date();
        // const offset = date.getTimezoneOffset();
        // const syncDate = new Date(date.getTime() - offset * 60 * 1000);

        // return this.http
        //     .put(NOTES_API_URL, { ...note, dateSync: syncDate })
        //     .pipe(map((response) => new Note(response)));
    }
}
