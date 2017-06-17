import { NgModule } from '@angular/core';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [CommonModule, AuthorizationRoutingModule, SharedModule],
  declarations: [AuthorizationComponent],
  exports: [AuthorizationComponent]
})
export class AuthorizationModule { }
