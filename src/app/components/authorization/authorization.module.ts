import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, AuthorizationRoutingModule, SharedModule, AuthorizationComponent],
    exports: [AuthorizationComponent]
})
export class AuthorizationModule {}
