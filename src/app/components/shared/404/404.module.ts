import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './404.component';
import { NotfoundRoutingModule } from './404-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [CommonModule, NotfoundRoutingModule, SharedModule, NotfoundComponent],
    exports: [NotfoundComponent]
})
export class NotfoundModule {}
