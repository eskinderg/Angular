import { Component, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

  public x:number;
  public y:number;

  constructor(private modalService: NgbModal) {

  }

  showDialog() {
      const activeModal = this.modalService.open(ModalComponent, {size: 'lg',backdrop: false} );
      activeModal.componentInstance.modalHeader = 'Large Modal';
      // console.log(activeModal.componentInstance);
  }

  @HostListener('window:resize', ['$event'] )
  public onWindowResize($event:any):void {
      // console.log($event);
      // this.x = $event.currentTarget.innerWidth;
      // this.y = $event.currentTarget.innerHeight;
  }

}
