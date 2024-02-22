import { Injectable } from '@angular/core';
import * as fromNotes from '../../../../store/reducers/note.reducer';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Injectable()
export class NoteResolver {
  constructor(private store: Store<fromNotes.INotesState>) {}

  resolve() {
    return this.store.select(fromNotes.getNoteCurrentRoute).pipe(
      filter((v) => v !== undefined),
      first()
    );
  }
}
