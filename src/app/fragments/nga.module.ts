import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaBackTopComponent } from './components/baBackTop/baBackTop.component';
import { CardComponent } from './components/card/card.component';
import { AppLoadingComponent } from './components/appLoading/appLoading.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { CheckMarkComponent } from './components/checkMark/checkmark.component';
import {
    ConfirmService,
    ConfirmState,
    ConfirmDialogComponent,
    DialogInfoComponent,
    ConfirmTemplateDirective
} from './components/dialog';
import { RatingDecimalComponent } from '../components/movies/components/rating/rating';
import { FormatDatePipe } from '../components/movies/directives/dateFormat';
import { SharedModule } from '../components/shared/shared.module';
import { NoteTextComponent } from './components/note.text/note.text.component';
import { AgoDatePipe } from '../components/movies/directives/dateagopipe';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { PopoverModule } from './components/popover/popover.module';
import { RatingModule } from './components/rating/rating.module';
import { PaginationModule } from './components/pagination/pagination.module';

const NGA_COMPONENTS = [
    BaBackTopComponent,
    CardComponent,
    AppLoadingComponent,
    BarchartComponent,
    ConfirmDialogComponent,
    NoteTextComponent,
    DialogInfoComponent,
    CheckMarkComponent,
    RatingDecimalComponent
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
    ConfirmTemplateDirective
    // BaScrollPosition,
    // BaSlimScroll,
    // BaThemeRun,
    // BaCardBlur
];

const NGA_PIPES = [
    FormatDatePipe,
    AgoDatePipe
    // BaAppPicturePipe,
    // BaKameleonPicturePipe,
    // BaProfilePicturePipe
];

const NGA_SERVICES = [
    ConfirmService,
    ConfirmState
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
    declarations: [...NGA_PIPES, ...NGA_DIRECTIVES, ...NGA_COMPONENTS],
    imports: [
        CommonModule,
        SharedModule,
        TooltipModule,
        PopoverModule,
        RatingModule,
        PaginationModule
        // RouterModule,
        // FormsModule,
        // ReactiveFormsModule,
        // AppTranslationModule,
        // NgUploaderModule
    ],
    exports: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS,
        TooltipModule,
        PopoverModule,
        RatingModule,
        PaginationModule
    ]
})

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
