import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { adminReducer } from './reducers/admin.notes.reducer';
import { AdminNotesDataService } from '../notes.data.service';
import { AdminEffect } from './effects/admin.effect';

@NgModule({
    imports: [
        StoreModule.forRoot({ admin: adminReducer }),
        EffectsModule.forRoot([AdminEffect]),
        StoreDevtoolsModule.instrument({ connectInZone: true })
    ],
    providers: [AdminNotesDataService]
})
export class AdminStoreModule {}
