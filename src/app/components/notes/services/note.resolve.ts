import { Injectable, inject } from '@angular/core';
import * as fromNotes from '../../../store/reducers/note.reducer';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Injectable()
export class NoteResolver {
    private store = inject<Store<fromNotes.INotesState>>(Store);

    resolve() {
        return this.store.select(fromNotes.getNoteCurrentRoute).pipe(
            filter((v) => v !== undefined),
            first()
        );
    }
}
