import { NgModule } from '@angular/core';

import {
    PaginationComponent,
    PaginationEllipsisDirective,
    PaginationFirstDirective,
    PaginationLastDirective,
    PaginationNextDirective,
    PaginationNumberDirective,
    PaginationPreviousDirective,
    PaginationPagesDirective
} from './pagination';

export {
    PaginationComponent,
    PaginationEllipsisDirective,
    PaginationFirstDirective,
    PaginationLastDirective,
    PaginationNextDirective,
    PaginationNumberDirective,
    PaginationPreviousDirective,
    PaginationPagesDirective
} from './pagination';
export { PaginationConfig as NgbPaginationConfig } from './pagination-config';

const NGB_PAGINATION_DIRECTIVES = [
    PaginationComponent,
    PaginationEllipsisDirective,
    PaginationFirstDirective,
    PaginationLastDirective,
    PaginationNextDirective,
    PaginationNumberDirective,
    PaginationPreviousDirective,
    PaginationPagesDirective
];

@NgModule({
    imports: NGB_PAGINATION_DIRECTIVES,
    exports: NGB_PAGINATION_DIRECTIVES
})
export class PaginationModule {}
