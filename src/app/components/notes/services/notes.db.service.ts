import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { inject, Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';
import { AuthService } from 'src/app/auth/auth.service';

interface NoteDB extends DBSchema {
    notes: {
        key: [string, string];
        value: Note;
        indexes: { compositeIndex: [string, string] };
    };
}

@Injectable({
    providedIn: 'root'
})
export class NoteLocalDbService {
    private dbPromise: Promise<IDBPDatabase<NoteDB>>;
    private authService = inject(AuthService);

    constructor() {
        this.dbPromise = this.initDb();
    }

    private initDb(): Promise<IDBPDatabase<NoteDB>> {
        return openDB<NoteDB>('my-note-db', 1, {
            upgrade(db) {
                const noteStore = db.createObjectStore('notes', {
                    keyPath: ['note_id', 'user_id']
                });
                noteStore.createIndex('compositeIndex', ['note_id', 'user_id'], { unique: true });
            }
        });
    }

    public async syncRemoteWithLocal(remoteNotes: Note[]): Promise<Note[]> {
        const db = await this.dbPromise;
        const tx = db.transaction(['notes'], 'readwrite');
        const store = tx.objectStore('notes');

        const userId = this.authService.getUserId();

        await Promise.all(
            remoteNotes.map(async (note) => {
                const localNote = await store.get([note.note_id, note.user_id]);

                if (localNote) {
                    await store.put({ ...note, sync: true });
                }
            })
        );

        const allLocal = await store.getAll();

        await tx.done;

        return allLocal.filter((n) => n.user_id === userId);
    }

    public async syncNotes(notes: Note[]): Promise<Note[]> {
        const db = await this.dbPromise;
        const tx = db.transaction(['notes'], 'readwrite');
        const store = tx.objectStore('notes');

        const allLocal = await store.getAll();
        const userId = this.authService.getUserId();

        // DELETE PHASE
        const forDelete = allLocal.filter(
            (local) => local.user_id === userId && !notes.some((n) => n.note_id === local.note_id)
        );

        for (const n of forDelete) {
            if (n.sync) {
                await store.delete([n.note_id, n.user_id]);
            }
        }

        // UPDATE / ADD PHASE
        await Promise.all(
            notes.map(async (note) => {
                const localNote = await store.get([note.note_id, note.user_id]);

                if (!localNote) {
                    await store.add(note);
                    return;
                }

                const remoteNewer =
                    new Date(note.date_modified) > new Date(localNote.date_modified) ||
                    // new Date(note.pin_order) > new Date(localNote.pin_order) ||
                    note.pin_order > localNote.pin_order ||
                    new Date(note.last_modified_date) > new Date(localNote.last_modified_date) ||
                    new Date(note.date_deleted) > new Date(localNote.date_deleted) ||
                    new Date(note.date_archived) > new Date(localNote.date_archived);

                if (remoteNewer || note.user_id !== localNote.user_id) {
                    await store.put(note);
                }
            })
        );

        await tx.done;

        // FETCH UPDATED DATA
        const freshTx = db.transaction(['notes'], 'readonly');
        const freshStore = freshTx.objectStore('notes');
        const updatedNotes = await freshStore.getAll();
        await freshTx.done;

        return updatedNotes.filter((n) => n.user_id === userId);
    }

    public async upsertNote(note: Note): Promise<Note> {
        const db = await this.dbPromise;

        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');

        await store.put(note);
        await tx.done;

        return note;
    }

    public async getNoteById(id: string): Promise<Note> {
        const db = await this.dbPromise;
        const note = await db.getFromIndex('notes', 'compositeIndex', [id, this.authService.getUserId()]);

        return note;
    }

    public async getAllNotes(): Promise<Note[]> {
        const db = await this.dbPromise;
        const notes = await db.getAll('notes');
        const filteredUserNotes = notes.filter((n) => n.user_id === this.authService.getUserId());
        return filteredUserNotes;
    }
}
