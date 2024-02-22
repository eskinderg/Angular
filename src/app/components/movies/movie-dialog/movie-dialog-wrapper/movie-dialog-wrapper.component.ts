import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, zip } from 'rxjs';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-movie-dialog-wrapper',
  templateUrl: './movie-dialog-wrapper.component.html',
  styleUrl: './movie-dialog-wrapper.component.scss'
})
export class MovieDialogWrapperComponent implements OnDestroy, AfterViewInit {
  destroy = new Subject<any>();
  currentDialog: NgbModalRef;
  dialogResult: any;

  constructor(
    private dialogService: NgbModal,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router,
    public ls: LocationStrategy
  ) {}

  ngAfterViewInit(): void {
    let routeParams = this.route.params;
    let routeData = this.route.data;

    zip(routeParams, routeData)
      .pipe(takeUntil(this.destroy))
      .subscribe(result => {
        this.currentDialog = this.dialogService.open(result[1]['component'], {
          centered: true,
          scrollable: false,
          container: '#movieDialog',
          size: 'xl'
        });
        this.currentDialog.componentInstance.params = result[0];
        this.currentDialog.componentInstance.movieDetail = result[1]['movieDetail'];
        this.currentDialog.componentInstance.stateParams = window.history.state['data'];

        this.dialogResult = this.currentDialog.result.then(
          result => {
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

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.currentDialog?.close(-1);
    this.dialogResult = null;
  }
}
