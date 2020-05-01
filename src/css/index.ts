import { directive } from 'lit-html';
import { transitionBase } from '../core/transition-base';
import { fade as defaultTransition } from './transitions/fade';
import { normalizeCSSTransitionOptions } from './utils';
import { flow } from './flow';
import {
  CSSTransitionOptions,
  CSSTransitionOptionsGenerator
} from './interfaces';

/**
 * re-export predefined transitions
 */ 
export * from './transitions';

/**
 * re-export mark
 */ 
export {mark} from '../core/utils';

/**
 * this is the actual directive
 */
export const transition = directive(function(
    elem:any,
    opts:CSSTransitionOptionsGenerator | CSSTransitionOptions = defaultTransition
    ) {
    if(typeof opts === 'function') {
      opts = opts();
    }
  return transitionBase(flow)(
    elem,
    normalizeCSSTransitionOptions(opts)
  );
});

