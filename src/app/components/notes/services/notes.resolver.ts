import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotesApiService } from './notes.api.service';
import { Note } from '../../../models/note';
import { Observable } from 'rxjs';

@Injectable()
export class NotesResolver implements Resolve<Note[]> {

  constructor(private notesApiService: NotesApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Note[] | Observable<Note[]> | Promise<Note[]> {
    throw new Error('Method not implemented.');
  }

  // resolve(route: ActivatedRouteSnapshot) {
  //   return null;
  //   // return this.notesApiService.getNotes();
  // }
}
