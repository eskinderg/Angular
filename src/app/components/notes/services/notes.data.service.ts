import { Injectable } from '@angular/core';
// import { Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note';
import { map } from 'rxjs/operators';

const API_ROOT = environment.NOTES_API;

@Injectable()
export class NotesDataService {

  // private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

  constructor(public http: HttpClient) { }

  getNotes()  {
    return this.http.get<Note[]>(API_ROOT);
  }

  addNote(note: Note): Observable<Note> {

    // if(note.id!=undefined)
    // {
    //   return this.updateNote(note);
    // }
    // else
    // {
      return this.http.post<Note>(API_ROOT, note)
    // }
  }

  deleteNote(note: Note): Observable<Note> {
    return this.http
    .delete(API_ROOT + note.id)
    .pipe
    (
      map(response => {
        return new Note({...note});
      })
    )
  }

  addOrUpdateNote(note: Note): Observable<Note> {
    return this.http.post(API_ROOT, JSON.stringify(note))
    .pipe
    (
      map(response => {
        return new Note(response);
      })
    )
  }

  updateNote(note: Note): Observable<Note> {
    return this.http
    .put(API_ROOT, note)
    .pipe
    (
      map( response => {
        return new Note(response);
      })
    )
  }
}
