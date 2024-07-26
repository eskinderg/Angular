/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgbRTL } from './rtl';
import { inject } from '@angular/core';

const placementSeparator = /\s+/;
const spacesRegExp = /  +/gi;

/**
 * Matching classes from the Bootstrap ones to the poppers ones.
 * The first index of each array is used for the left to right direction,
 * the second one is used for the right to left, defaulting to the first index (when LTR and RTL lead to the same class)
 *
 * See [Bootstrap alignments](https://getbootstrap.com/docs/5.1/components/dropdowns/#alignment-options)
 * and [Popper placements](https://popper.js.org/docs/v2/constructors/#options)
 */
const bootstrapPopperMatches = {
    top: ['top'],
    bottom: ['bottom'],
    start: ['left', 'right'],
    left: ['left'],
    end: ['right', 'left'],
    right: ['right'],
    'top-start': ['top-start', 'top-end'],
    'top-left': ['top-start'],
    'top-end': ['top-end', 'top-start'],
    'top-right': ['top-end'],
    'bottom-start': ['bottom-start', 'bottom-end'],
    'bottom-left': ['bottom-start'],
    'bottom-end': ['bottom-end', 'bottom-start'],
    'bottom-right': ['bottom-end'],
    'start-top': ['left-start', 'right-start'],
    'left-top': ['left-start'],
    'start-bottom': ['left-end', 'right-end'],
    'left-bottom': ['left-end'],
    'end-top': ['right-start', 'left-start'],
    'right-top': ['right-start'],
    'end-bottom': ['right-end', 'left-end'],
    'right-bottom': ['right-end']
};

const popperStartPrimaryPlacement = /^left/;
const popperEndPrimaryPlacement = /^right/;
const popperStartSecondaryPlacement = /^start/;
const popperEndSecondaryPlacement = /^end/;
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'start', 'end',
 *   'top-start', 'top-end',
 *   'bottom-start', 'bottom-end',
 *   'start-top', 'start-bottom',
 *   'end-top', 'end-bottom'.
 * */

export type Placement =
    | 'auto'
    | 'top'
    | 'bottom'
    | 'start'
    | 'left'
    | 'end'
    | 'right'
    | 'top-start'
    | 'top-left'
    | 'top-end'
    | 'top-right'
    | 'bottom-start'
    | 'bottom-left'
    | 'bottom-end'
    | 'bottom-right'
    | 'start-top'
    | 'left-top'
    | 'start-bottom'
    | 'left-bottom'
    | 'end-top'
    | 'right-top'
    | 'end-bottom'
    | 'right-bottom';

export type PlacementArray = Placement | Array<Placement> | string;

interface PositioningOptions {
    hostElement: HTMLElement;
    targetElement: HTMLElement;
    placement: string | Placement | PlacementArray;
    baseClass?: string;
}

function noop(arg) {
    return arg;
}
