import {
  html
} from 'lit-html';

import {
  CSSTransitionOptions,
  TransitionMode
} from '../base';

/**
 * takes an object and normalizes it into CSSTransitionOptions
 * by padding it with defaults etc..
 */
export function CSSTransition(opts : any = {}): CSSTransitionOptions {
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
      } : {
        active: 'leave-active',
        from: 'leave-from',
        to: 'leave-to',
        lock: mode !== TransitionMode.Both,
        ...leave
      } ): false,
    onEnter,
    onLeave,
    onAfterEnter,
    onAfterLeave,
    mode
  }
}