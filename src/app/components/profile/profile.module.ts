import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ThemeOptionComponent } from 'src/app/theme/components/appThemeOption/appThemeOption.component';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgaModule,
    NgbModule,
    ThemeOptionComponent
  ],
  exports: [],
  declarations: [ProfileComponent],
})
export class ProfileModule { }
