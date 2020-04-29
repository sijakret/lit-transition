import {directive} from 'lit-html';
import {transitionBase} from '../core/transition-base';
import {fade as defaultTransition} from './transitions/fade';
import {CSSTransition} from './transitions/_utils';
import {flow} from './flow';

export * from './transitions/index';
export {mark} from '../core/utils';
export const transition = directive(function(elem:any, opts:any = defaultTransition) {
  if(typeof opts === 'function') {
    opts = opts();
  }
  return transitionBase(flow)(elem, CSSTransition(opts));
});

