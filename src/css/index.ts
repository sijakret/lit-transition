import {directive} from 'lit-html';
import {transitionBase} from '../core/transition-base';
import {fade as defaultTransition} from './transitions/fade';
import {flow} from './flow';

export * from './transitions';
export {mark} from '../core/utils';
export const transition = directive(function(elem:any, opts:any = defaultTransition) {
  if(typeof opts === 'function') {
    opts = opts();
  }
  return transitionBase(flow)(elem, opts);
});

