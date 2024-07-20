import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgaModule } from 'src/app/fragments/nga.module';
import { NoteDialogComponent } from './note-dialog.component';
import { NoteDialogService } from './note.dialog.service';

@NgModule({
    imports: [SharedModule, NgaModule],
    declarations: [NoteDialogComponent],
    exports: [NoteDialogComponent],
    providers: [NoteDialogService]
})
export class NoteDialogModule {}
