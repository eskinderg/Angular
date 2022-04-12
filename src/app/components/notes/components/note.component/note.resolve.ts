import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Note } from '../../../../models/note';
import { NotesDataService } from '../../services/notes.data.service';

@Injectable()
export class NoteResolver implements Resolve<Note> {

  constructor(private notesDataService: NotesDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.notesDataService.getNote(route.params['id']); //resolving directly from the server rather than the store
  }
}
