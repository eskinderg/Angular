import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import { environment } from '../../../../environments/environment';

import { Note } from '../note';

@Injectable()
export class NotesDataService {

  private API_ROOT: String = environment.API;
  private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

  constructor(public http: HttpClient) { }

  getNotes() : Observable<Note[]>  {
    return this.http.get<Note[]>(`${this.API_ROOT}/notes`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http
    .post(this.API_ROOT + '/notes/', note)
    .map(response => {
      return new Note(response);
    });
  }

  deleteNoteById(noteId: number): Observable<Note> {
    return this.http
    .delete(this.API_ROOT + '/notes/' + noteId)
    .map(response => {
      return new Note(response);
    });
  }

  addOrUpdateNote(note: Note): Observable<Note> {
    return this.http.post(`${this.API_ROOT}/notes`, JSON.stringify(note))
    .map(response => {
      return new Note(response);
    });
  }

  updateNote(note: Note): Observable<Note> {
    return this.http
    .put( this.API_ROOT + '/notes/' + note.id, note)
    .map( response => {
      return new Note(response);
    });
  }
}
