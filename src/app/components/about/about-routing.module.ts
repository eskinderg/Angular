import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';
import { authGuard } from '../../auth/auth.guard';

export const aboutRoutes: Routes = [
    {
        path: '',
        component: AboutComponent,
        children: [
            { path: '', redirectTo: 'about-us', pathMatch: 'full' },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'feature', component: FeatureComponent }
        ],
        canActivate: [authGuard]
    }
];
