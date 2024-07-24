import { NgModule } from '@angular/core';

import { RatingComponent } from './rating';

export { RatingComponent } from './rating';
export { RatingConfig } from './rating-config';

@NgModule({
    imports: [RatingComponent],
    exports: [RatingComponent]
})
export class RatingModule {}
