import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotesApiService } from './notes.api.service';
import { Note } from '../note';

@Injectable()
export class NotesResolver implements Resolve<Note[]> {

  constructor(private notesApiService: NotesApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return null;
    //return this.notesApiService.getNotes();
  }
}
