import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Renderer2
} from '@angular/core';
import { Event } from 'src/app/fragments/components/event/event';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/reducers';
import * as EventsActions from '../../../store/actions/event.action';

@Component({
    selector: 'app-event-detail-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrl: './event-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class EventDialogComponent implements OnInit, AfterViewInit {
    public event: Event;

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private store: Store<fromRoot.IAppState>
    ) {}

    ngOnInit(): void {
        this.renderer.listen(this.host.nativeElement, 'keydown.esc', () => {
            this.close();
        });
    }

    ngAfterViewInit(): void {
        (this.host.nativeElement.firstElementChild as HTMLElement).focus();
    }

    close() {
        this.host.nativeElement.remove();
    }

    no() {
        this.host.nativeElement.remove();
    }

    yes() {
        // this.eventApiService.archiveNote(this.note);
        this.store.dispatch(EventsActions.deleteEvent({ payload: this.event }));
        this.host.nativeElement.remove();
    }
}
