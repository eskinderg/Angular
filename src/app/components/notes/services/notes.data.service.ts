import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../../../environments/environment';

import { Note } from '../../../models/note';

import { map } from 'rxjs/operators';

@Injectable()
export class NotesDataService {

  private API_ROOT: String = environment.API;
  private JSON_HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

  constructor(public http: HttpClient) { }

  getNotes() : Observable<Note[]>  {
    return this.http.get<Note[]>(`${this.API_ROOT}/notes`);
  }

  addNote(note: Note): Observable<Note> {

    if(note.id!=undefined)
    {
      return this.updateNote(note);
    }
    else
    {
      return this.http
        .post(this.API_ROOT + '/notes/', note)
      .pipe
      (
        map(response => {
          return new Note(response);
        })
      )
    }
  }

  deleteNote(note: Note): Observable<Note> {
    return this.http
    .delete(this.API_ROOT + '/notes/' + note.id)
    .pipe
    (
      map(response => {
        return new Note({...note});
      })
    )
  }

  addOrUpdateNote(note: Note): Observable<Note> {
    debugger;
    return this.http.post(`${this.API_ROOT}/notes`, JSON.stringify(note))
    .pipe
    (
      map(response => {
        return new Note(response);
      })
    )
  }

  updateNote(note: Note): Observable<Note> {
    return this.http
    .put( this.API_ROOT + '/notes/' + note.id, note)
    .pipe
    (
      map( response => {
        return new Note(response);
      })
    )
  }
}
