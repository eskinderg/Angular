import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import * as fromNotes from '../../../../reducers/notes.reducer';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Injectable()
export class NoteResolver {

  constructor(private store: Store<fromNotes.NotesState>) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.store.select(fromNotes.getNoteById(Number(route.params['id']))).pipe(
      filter(v => v !== undefined),
      first()
    )
  }

}
