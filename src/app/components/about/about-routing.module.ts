import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AboutComponent ,
        children: [
          {path: '', redirectTo: 'about-us', pathMatch: 'full'},
          {path: 'about-us', component: AboutUsComponent},
          {path: 'profile', component: ProfileComponent},
          {path: 'feature', component: FeatureComponent}
        ]
    }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
