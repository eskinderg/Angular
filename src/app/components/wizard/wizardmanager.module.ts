import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardManagerComponent } from './wizardmanager.component';
import { WzToolbarComponent } from './wztoolbar/wztoolbar.component';

import { WizardManagerRoutingModule } from './wizard-route.module';
// import { AboutUsComponent } from './about-us/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { FeatureComponent } from './feature/feature.component';
import { PaymentComponent } from './payment/payment.component';
import { WzCommonComponent } from './common/common.component';

import { SharedModule } from '../shared/shared.module';
import { NgaModule } from '../../fragments/nga.module';

@NgModule({
    imports: [
        CommonModule,
        WizardManagerRoutingModule,
        SharedModule,
        NgaModule,
        WizardManagerComponent,
        WzToolbarComponent,
        ProfileComponent,
        PaymentComponent,
        FeatureComponent,
        WzCommonComponent
    ],
    exports: [WizardManagerComponent]
})
export class WizardManagerModule {}
