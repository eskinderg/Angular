import { Routes } from '@angular/router';
import { WizardManagerComponent } from './wizardmanager.component';
import { authGuard } from '../shared/services/auth/auth-guard.service';

import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';
import { PaymentComponent } from './payment/payment.component';

export const wizardRoutes: Routes = [
    {
        path: '',
        component: WizardManagerComponent,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            // {path: 'about-us', component: AboutUsComponent},
            { path: 'profile', component: ProfileComponent },
            { path: 'feature', component: FeatureComponent },
            { path: 'payment', component: PaymentComponent }
        ],
        canActivate: [authGuard]
    }
];
