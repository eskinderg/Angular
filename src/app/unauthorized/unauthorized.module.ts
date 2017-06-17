import { NgModule } from '@angular/core';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// import { ModalComponent } from './modal/modal.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [CommonModule, UnauthorizedRoutingModule, SharedModule],
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent]
})
export class UnauthorizedModule { }
