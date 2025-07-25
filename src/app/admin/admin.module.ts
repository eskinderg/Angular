import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { adminRoutes } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin.dashboard.component';
import { EditNoteDialogComponent } from './components/notes/edit.note.dialog/edit-note-dialog.component';
import { AdminNoteApiService } from './admin.notes.api.service';
import { AdminStoreModule } from './store/admin.store.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminStoreModule,
        EditNoteDialogComponent,
        AdminDashboardComponent,
        RouterModule.forChild(adminRoutes)
    ],
    providers: [AdminNoteApiService]
})
export class AdminModule {}
