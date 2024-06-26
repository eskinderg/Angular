import { APP_INITIALIZER, NgModule } from '@angular/core';
import { initializePreference } from './init.theme';
import { ThemeService } from './theme.service';

@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializePreference,
            deps: [ThemeService],
            multi: true
        }
    ]
})
export class ThemeModule {}
