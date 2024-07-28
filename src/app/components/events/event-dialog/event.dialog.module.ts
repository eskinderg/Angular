import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NgaModule } from 'src/app/fragments/nga.module';
import { EventDialogComponent } from './event-dialog.component';
import { EventDialogService } from './event.dialog.service';

@NgModule({
    imports: [SharedModule, NgaModule],
    declarations: [EventDialogComponent],
    exports: [EventDialogComponent],
    providers: [EventDialogService]
})
export class EventDialogModule {}
