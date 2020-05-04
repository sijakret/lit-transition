import {
  html
} from 'lit-html';

import {
  CSSTransitionOptions,
  TransitionMode
} from './interfaces';

/**
 * takes an object and normalizes it into CSSTransitionOptions
 * by padding it with defaults etc..
 */
export function normalizeCSSTransitionOptions(opts : any = {}): CSSTransitionOptions {
  const {
    css,
    duration,
    enter={},
    leave={},
    mode = TransitionMode.Both,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave
  } = opts;

  // don't do it by default, it might confuse
  const lock = false; //mode !== TransitionMode.Both;
  return {
    duration,
    css: html`<style>${css}</style>`,
    enter: enter != false ? (Array.isArray(enter)||typeof enter === 'string' ? {
        active: enter,
      } : {
        active: 'enter-active',
        from: 'enter-from',
        to: 'enter-to',
        ...enter
      }) : false,
    leave: leave != false ? (Array.isArray(leave)||typeof leave === 'string' ? {
        active: leave,
        lock
      } : {
        active: 'leave-active',
        from: 'leave-from',
        to: 'leave-to',
        lock,
        ...leave
      } ): false,
    onEnter,
    onLeave,
    onAfterEnter,
    onAfterLeave,
    mode
  }
}


export function instantiateDefault(generator:any) {
  // create default instance
  const inst = generator();
  // patch generator with default instance
  for(let p in inst) {
    generator[p] = inst[p];
  }
  return generator;
}

/*
* avoiding lodash for now
*/
export function mergeObjects(obj1:any, obj2:any) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = mergeObjects(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}