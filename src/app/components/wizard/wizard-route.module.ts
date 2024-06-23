import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardManagerComponent } from './wizardmanager.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';

// import { AboutUsComponent } from './about-us/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
    imports: [
        RouterModule.forChild([
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
                canActivate: [AuthGuardService]
            }
        ])
    ],
    exports: [RouterModule]
})
export class WizardManagerRoutingModule {}
