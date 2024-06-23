import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdToastGlobalComponent } from './toast.global.component';
import { ToastService } from './toast.service';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [NgbdToastGlobalComponent],
    exports: [NgbdToastGlobalComponent],
    providers: [ToastService]
})
export class NgbdToastGlobalModule {}
