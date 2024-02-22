import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, zip } from 'rxjs';
import { Location } from '@angular/common';
import * as fromEvents from '../../../../store/reducers/events.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-events-dialog-wrapper',
  templateUrl: './events-dialog-wrapper.component.html',
  styleUrl: './events-dialog-wrapper.component.scss'
})
export class EventsDialogWrapperComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: NgbModalRef;
  dialogResult: any;

  constructor(
    private dialogService: NgbModal,
    route: ActivatedRoute,
    private location: Location,
    private store: Store<fromEvents.IEventsState>
  ) {
    let routeParams = route.params;
    let routeData = route.data;

    zip(routeParams, routeData)
      .pipe(takeUntil(this.destroy))
      .subscribe((result) => {
        this.currentDialog = this.dialogService.open(result[1]['component'], {
          centered: true,
          size: 'lg'
        });
        // this.store.select(fromEvents.getItemById())
        // console.log(result)
        // this.store.select(fromEvents.getItemById(result[0]["eventid"])).subscribe((v) => {
        //   console.log(v)
        // })
        // console.log(this.currentDialog.componentInstance)
        // this.currentDialog.componentInstance.params = result[0];
        // this.currentDialog.componentInstance.Event = this.store.select(fromEvents.getItemById(result[0]["eventid"]));
        // this.currentDialog.componentInstance.stateParams = window.history.state['data'];

        this.dialogResult = this.currentDialog.result.then(
          (result) => {
            if (result !== -1) {
              this.location.back();
            }
          },
          () => {
            this.location.back();
          }
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(undefined);
    this.currentDialog?.close(-1);
    this.dialogResult = null;
  }
}
