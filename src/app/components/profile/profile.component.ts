import { Component, HostListener, HostBinding } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Observable } from 'rxjs/Observable';
import { ConfirmService } from '../../theme/components/modal/confirm.service';

/**
 * This class represents the lazy loaded ProfileComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class ProfileComponent {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  public x: number;
  public y: number;

  constructor(private confirmService: ConfirmService) {
  }

  showDialog() {
    this.confirmService.confirm({ title: 'Confirm deletion',
              message: 'Do you really want to delete this item?' }
     ).then(
      () => {
        console.log('deleting...');
      },
      () => {
        console.log('not deleting...');
      });
  }

  @HostListener('window:resize', ['$event'] )
  public onWindowResize($event: any): void {
      // console.log($event);
      // this.x = $event.currentTarget.innerWidth;
      // this.y = $event.currentTarget.innerHeight;
  }

}
