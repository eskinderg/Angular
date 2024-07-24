import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgaModule } from '../../fragments/nga.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, ProfileRoutingModule, SharedModule, NgaModule],
    exports: [],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
