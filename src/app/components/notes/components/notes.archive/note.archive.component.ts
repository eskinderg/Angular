import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NoteApiService } from '../../services/notes.api.service';
import { Note } from 'src/app/models/note';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { TooltipDirective } from '../../../../fragments/components/tooltip/tooltip.directive';
import { AgoDatePipe } from '../../../movies/directives/dateagopipe';
import { NoteTitleTruncatePipe } from '../../../movies/directives/noteTitleTruncate';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';
import { SvgIconComponent } from '../../../shared/svg/svg.component';

@Component({
    selector: 'app-note.archive',
    templateUrl: './note.archive.component.html',
    styleUrl: './note.archive.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        SvgIconComponent,
        TooltipDirective,
        AsyncPipe,
        DatePipe,
        AgoDatePipe,
        NoteTitleTruncatePipe
    ],
    providers: [NoteApiService]
})
export class NoteArchiveComponent {
    private notesApiService = inject(NoteApiService);
    private dialogService = inject(DialogService);
    router = inject(Router);

    constructor() {
        this.notesApiService.syncNotes();
    }

    get ArchivedNotes() {
        return this.notesApiService.ArchivedNotes;
    }

    delete(note: Note) {
        this.dialogService
            .openDialog(
                'Delete Note',
                'Are you sure you want to permanently delete this note?',
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.WARNING
            )
            .then((result: DIALOG_RESPONSE) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.notesApiService.updateNote({ ...note, active: false, date_deleted: new Date() });
                }
            });
    }

    restore(note: Note) {
        this.notesApiService.updateNote({ ...note, archived: false, date_archived: new Date() } as Note);
    }
}
