import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BaBackTop } from './components/baBackTop/baBackTop.component';
import { BaCard } from './components/baCard/baCard.component';


const NGA_COMPONENTS = [
  BaBackTop,
  BaCard
  // BaAmChart,
  // BaBackTop,
  // BaCard,
  // BaChartistChart,
  // BaCheckbox,
  // BaContentTop,
  // BaFullCalendar,
  // BaMenuItem,
  // BaMenu,
  // BaMsgCenter,
  // BaMultiCheckbox,
  // BaPageTop,
  // BaPictureUploader,
  // BaSidebar,
  // BaFileUploader
];

const NGA_DIRECTIVES = [
  // BaScrollPosition,
  // BaSlimScroll,
  // BaThemeRun,
  // BaCardBlur
];

const NGA_PIPES = [
  // BaAppPicturePipe,
  // BaKameleonPicturePipe,
  // BaProfilePicturePipe
];

const NGA_SERVICES = [
  // BaImageLoaderService,
  // BaThemePreloader,
  // BaThemeSpinner,
  // BaMenuService
];

const NGA_VALIDATORS = [
  // EmailValidator,
  // EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule
    // RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    // AppTranslationModule,
    // NgUploaderModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        // BaThemeConfigProvider,
        // BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
