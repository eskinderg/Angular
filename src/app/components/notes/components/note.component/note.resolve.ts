import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotesApiService } from '../../services/notes.api.service';
import { Note } from '../../../../models/note';

@Injectable()
export class NoteResolver implements Resolve<any> {

  constructor(private notesApiService: NotesApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // return null;
    console.log(route.params['id']);
    return this.notesApiService.getNote(route.params['id']);
  }
}
