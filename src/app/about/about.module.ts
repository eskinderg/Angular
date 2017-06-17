import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutUsComponent } from './about-us/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, SharedModule],
  declarations: [
      AboutComponent,
      AboutUsComponent,
      ProfileComponent,
      FeatureComponent
    ],
  exports: [AboutComponent]
})
export class AboutModule { }
