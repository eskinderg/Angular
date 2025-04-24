import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-bulk-update-dialog',
    templateUrl: './bulk-update-dialog.component.html',
    styleUrls: ['./bulk-update-dialog.component.scss'],
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUpdateDialogComponent implements OnInit {
    @Input() users: [string, string, number][] = []; // List of users as [owner, userId, count]
    @Output() closed = new EventEmitter<void>();
    @Output() updated = new EventEmitter<{ owner: string; userId: string; active: boolean | null }>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            owner: [''],
            userId: [''],
            active: [null]
        });

        // Update userId when owner changes
        this.form.get('owner')?.valueChanges.subscribe((owner) => {
            const user = this.users.find((u) => u[0] === owner);
            this.form.get('userId')?.setValue(user ? user[1] : '', { emitEvent: false });
        });
    }

    closeDialog() {
        this.closed.emit();
    }

    applyChanges() {
        this.updated.emit(this.form.value);
    }
}
