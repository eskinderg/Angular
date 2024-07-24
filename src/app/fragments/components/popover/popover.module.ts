import { NgModule } from '@angular/core';

import { PopoverDirective } from './popover';

export { PopoverDirective as NgbPopover } from './popover';
export { NgbPopoverConfig } from './popover-config';
export { Placement } from './util/positioning';

@NgModule({
    imports: [PopoverDirective],
    exports: [PopoverDirective]
})
export class PopoverModule {}
