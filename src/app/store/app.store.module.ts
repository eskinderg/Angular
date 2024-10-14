import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, metaReducers } from '../store/reducers';
import { NotesEffect, EventsEffect, AuthEffect, PreferenceEffect, RouterEffect } from '../store/effects';
import { EventDataService } from '../fragments/components/event/event.data.service/event.data.service';
import { NotesDataService } from '../components/notes/services/notes.data.service';

@NgModule({
    imports: [
        StoreModule.forRoot(appReducer, { metaReducers }),
        EffectsModule.forRoot([NotesEffect, EventsEffect, AuthEffect, PreferenceEffect, RouterEffect]),
        StoreDevtoolsModule.instrument({ connectInZone: true })
    ],
    providers: [EventDataService, NotesDataService]
})
export class AppStoreModule {}
