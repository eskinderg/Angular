import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminNoteApiService } from 'src/app/admin/admin.notes.api.service';
import { SharedModule } from 'src/app/components/shared/shared.module';

@Component({
    selector: 'app-users',
    imports: [SharedModule],
    templateUrl: `./users.component.html`,
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
    private adminNoteApiService = inject(AdminNoteApiService);

    allUsers$ = this.adminNoteApiService.Users;
    isDialogOpen = false;
    selectedUser: any = null;

    openEditDialog(user: any): void {
        this.selectedUser = { ...user }; // Create a copy of the user to edit
        this.isDialogOpen = true;
    }

    closeDialog(): void {
        this.isDialogOpen = false;
        this.selectedUser = null;
    }

    saveUser(): void {
        // Save the updated user (e.g., send it to the API)
        // console.log('User saved:', this.selectedUser);
        this.adminNoteApiService.bulkUpdateUsers([this.selectedUser]);
        this.closeDialog();
    }
}
