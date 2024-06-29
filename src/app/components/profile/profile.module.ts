import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../fragments/nga.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, ProfileRoutingModule, SharedModule, NgaModule, NgbModule],
    exports: [],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
