import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteColourSelectorComponent } from 'src/app/components/notes/main/right.view/note.colour.selector/note.colour.selector.component';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
    selector: 'app-bulk-update-dialog',
    templateUrl: './bulk-update-dialog.component.html',
    styleUrls: ['./bulk-update-dialog.component.scss'],
    imports: [ReactiveFormsModule, NoteColourSelectorComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUpdateDialogComponent implements OnInit, OnDestroy {
    @Input() users: { owner: string; user_id: string; total_notes: number; active_notes: number }[] = []; // List of users as [owner, userId, count]
    @Output() closed = new EventEmitter<void>();
    @Output() updated = new EventEmitter<{
        owner: string;
        userId: string;
        active: boolean | null;
        colour: string;
    }>();

    subscription: Subscription;

    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogService: DialogService
    ) {}

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            owner: [''],
            userId: [''],
            active: [null],
            colour: ['']
        });

        this.subscription = this.form.get('owner')?.valueChanges.subscribe((owner) => {
            const user = this.users.find((u) => u.owner === owner);
            this.form.get('userId')?.setValue(user ? user.user_id : '', { emitEvent: false });
        });
    }

    closeDialog() {
        this.closed.emit();
    }

    applyChanges() {
        this.dialogService
            .openDialog(
                'Bulk Update',
                'Do you want to apply bulk update?',
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.WARNING
            )
            .then((result) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.updated.emit(this.form.value);
                }
            });
    }
}
