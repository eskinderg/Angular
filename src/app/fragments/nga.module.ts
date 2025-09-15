import { ModuleWithProviders } from '@angular/core';
import { ConfirmService, ConfirmState } from './components/dialog';

const NGA_SERVICES = [ConfirmService, ConfirmState];

const NGA_VALIDATORS = [
    // EmailValidator,
    // EqualPasswordsValidator
];

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
export class NgaModule {
    static forRoot(): ModuleWithProviders<NgaModule> {
        return {
            ngModule: NgaModule,
            providers: [
                // BaThemeConfigProvider,
                // BaThemeConfig,
                ...NGA_VALIDATORS,
                ...NGA_SERVICES
            ]
        };
    }
}
