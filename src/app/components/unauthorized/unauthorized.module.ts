import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, UnauthorizedRoutingModule, SharedModule],
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent]
})
export class UnauthorizedModule {}
