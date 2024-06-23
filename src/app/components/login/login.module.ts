import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, SharedModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
