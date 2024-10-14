import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RightViewComponent } from './right-view.component';
import { MovieCardComponent } from '../components/movie.card/movie.card.component';
import { NgaModule } from 'src/app/fragments/nga.module';

@NgModule({
    imports: [SharedModule, NgaModule, RightViewComponent, MovieCardComponent],
    exports: [RightViewComponent, MovieCardComponent]
})
export class RightViewModule {}
