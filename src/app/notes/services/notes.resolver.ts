import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotesService } from './notes.service';
import { Note } from '../note';

@Injectable()
export class NotesResolver implements Resolve<Note[]> {

  constructor(private notesService: NotesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.notesService.getNotes();
  }
}
