import {CSSTransition} from './_utils';
import {CSSTransitionOptions,TransitionMode} from '../base';

interface CSSFadeOptions extends CSSTransitionOptions  {
  duration?: number
  ease?: string,
  opacity?: number
}

export function fade(opts:CSSFadeOptions = {}) {
  const {
    duration = 500,
    ease = 'ease-out',
    opacity = 0.0,
    mode = TransitionMode.InOut
  } = opts;
  return CSSTransition({
    css: `
    .leave-active {
      transition: opacity ${duration}ms ${ease},
        transform ${duration}ms ${ease};
    }
    .enter-active {
      transition: opacity ${duration}ms ${ease},
        transform ${duration}ms ${ease};
    }
  .leave-active {
    position: ${mode !== 'out-in' ? 'absolute' : 'initial'};
  } 
  .enter-from, .leave-to {
    opacity: ${opacity};
  }
  .enter-to, .leave-from {
    opacity: 1;
  }
  `,
  ...opts
  });
};