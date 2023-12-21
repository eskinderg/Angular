import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, zip } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-modal-wrapper',
  templateUrl: './movie-modal-wrapper.component.html',
  styleUrl: './movie-modal-wrapper.component.scss'
})
export class MovieModalWrapperComponent implements OnDestroy, AfterViewInit {

  destroy = new Subject<any>();
  currentDialog: NgbModalRef;
  dialogResult: any;

  constructor(private modalService: NgbModal, public route: ActivatedRoute, public location: Location) {
  }

  ngAfterViewInit(): void {
    let routeParams = this.route.params;
    let routeData = this.route.data;

    zip(routeParams, routeData)
      .pipe(takeUntil(this.destroy)).
      subscribe(result => {
        this.currentDialog = this.modalService.open(
          result[1]["component"],
          {
            centered: true,
            scrollable: false,
            container: '#movieModal',
            size:'xl'
          });
        this.currentDialog.componentInstance.params = result[0];
        this.currentDialog.componentInstance.movieDetail = result[1]["movieDetail"];
        this.currentDialog.componentInstance.stateParams = window.history.state['data'];

        this.dialogResult = this.currentDialog.result.then(result => {
          if (result !== -1) {
            this.location.back();
          }
        }, () => {
          this.location.back();
        });
      });

  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.currentDialog?.close(-1);
    this.dialogResult = null;
  }

}
