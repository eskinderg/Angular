import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note';

const API_ROOT = environment.NOTES_API;

@Injectable()
export class NotesDataService {
  constructor(public http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(API_ROOT);
  }

  getNote(id: number) {
    return this.http.get<Note>(API_ROOT + id);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(API_ROOT, note);
  }

  deleteNote(note: Note): Observable<Note> {
    return this.http.delete(API_ROOT + note.id).pipe(map(_response => new Note(_response)));
  }

  addOrUpdateNote(note: Note): Observable<Note> {
    return this.http.post(API_ROOT, JSON.stringify(note)).pipe(map(response => new Note(response)));
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put(API_ROOT, note).pipe(map(response => new Note(response)));
  }
}
