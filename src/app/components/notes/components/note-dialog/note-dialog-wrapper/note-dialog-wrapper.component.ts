import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Location, LocationStrategy } from '@angular/common';

@Component({
    selector: 'app-note-dialog-wrapper',
    templateUrl: './note-dialog-wrapper.component.html',
    styleUrl: './note-dialog-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDialogWrapperComponent implements OnDestroy {
    destroy = new Subject<any>();
    dialogResult: any;

    constructor(
        public route: ActivatedRoute,
        public location: Location,
        public router: Router,
        public ls: LocationStrategy
    ) {}

    ngOnDestroy() {
        this.destroy.next(undefined);
        this.dialogResult = null;
    }
}
