import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NoteApiService } from './notes.api.service';
import { Note } from '../../../models/note';
import { Observable } from 'rxjs';

@Injectable()
export class NotesResolver {
  constructor(private notesApiService: NoteApiService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Note[] | Observable<Note[]> | Promise<Note[]> {
    throw new Error('Method not implemented.');
  }

  // resolve(route: ActivatedRouteSnapshot) {
  //   return null;
  //   // return this.notesApiService.getNotes();
  // }
}
