import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  imports: [CommonModule, ProfileRoutingModule, SharedModule, NgbModule.forRoot()],
  declarations: [ProfileComponent, ModalComponent],
  entryComponents: [ModalComponent],
})
export class ProfileModule { }
