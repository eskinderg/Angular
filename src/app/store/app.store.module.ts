import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, metaReducers } from '../store/reducers';
import { NotesEffect, EventsEffect, AuthEffect, PreferenceEffect, RouterEffect } from '../store/effects';

@NgModule({
    imports: [
        StoreModule.forRoot(appReducer, { metaReducers }),
        EffectsModule.forRoot([NotesEffect, EventsEffect, AuthEffect, PreferenceEffect, RouterEffect]),
        StoreDevtoolsModule.instrument({ connectInZone: true })
    ]
})
export class AppStoreModule {}
