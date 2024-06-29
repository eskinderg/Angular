import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastGlobalComponent } from './toast.global.component';
import { ToastService } from './toast.service';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [ToastGlobalComponent],
    exports: [ToastGlobalComponent],
    providers: [ToastService]
})
export class ToastGlobalModule {}
