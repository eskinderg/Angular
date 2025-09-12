import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaBackTopComponent } from './components/baBackTop/baBackTop.component';
import { CardComponent } from './components/card/card.component';
import { AppLoadingComponent } from './components/appLoading/appLoading.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { ScatterPlotChartComponent } from './components/scatterPlotChart/scatterPlotChart.component';
import { CheckMarkComponent } from './components/checkMark/checkmark.component';
import {
    ConfirmService,
    ConfirmState,
    ConfirmDialogComponent,
    DialogInfoComponent,
    ConfirmTemplateDirective
} from './components/dialog';
// import { RatingDecimalComponent } from '../components/movies/components/rating/rating';
import { FormatDatePipe } from '../components/movies/directives/dateFormat';
import { SharedModule } from '../components/shared/shared.module';
import { NoteTextComponent } from './components/note.text/note.text.component';
import { AgoDatePipe } from '../components/movies/directives/dateagopipe';

const NGA_COMPONENTS = [
    BaBackTopComponent,
    CardComponent,
    AppLoadingComponent,
    BarchartComponent,
    ScatterPlotChartComponent,
    ConfirmDialogComponent,
    NoteTextComponent,
    DialogInfoComponent,
    CheckMarkComponent
    // RatingDecimalComponent
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
    imports: [CommonModule, SharedModule, ...NGA_PIPES, ...NGA_DIRECTIVES, ...NGA_COMPONENTS],
    exports: [...NGA_PIPES, ...NGA_DIRECTIVES, ...NGA_COMPONENTS]
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
