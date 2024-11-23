import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { ThemeService } from './theme.service';

@NgModule({
    providers: [ThemeService, provideAppInitializer(() => inject(ThemeService).initUserPreference())]
})
export class ThemeModule {}
