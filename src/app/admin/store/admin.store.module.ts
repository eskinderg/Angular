import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { adminReducer } from './reducers/admin.reducer';
import { AdminEffect } from './effects/admin.effect';

@NgModule({
    providers: [provideState('admin', adminReducer), provideEffects(AdminEffect)]
})
export class AdminStoreModule {}
