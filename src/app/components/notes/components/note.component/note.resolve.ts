import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Note } from '../../../../models/note';
import { NotesDataService } from '../../services/notes.data.service';

@Injectable()
export class NoteResolver  {

  constructor(private notesDataService: NotesDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.notesDataService.getNote(route.params['id']); //resolving directly from the server rather than the store
  }
}
