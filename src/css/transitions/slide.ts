import {CSSTransition} from './_utils';
import {CSSTransitionOptions,TransitionMode} from '../base';

interface CSSSlideOptions extends CSSTransitionOptions  {
  duration?: number
  ease?: string
  opacity?: number
  x?: string
  y?: string
}
export function slide(opts:CSSSlideOptions = {}) {
  const {
    duration = 500,
    x = '100%',
    y = '0%',
    ease = 'ease-out',
    opacity = 0.0,
    mode = TransitionMode.InOut
  } = opts;
  return CSSTransition({
    css:`
  .enter-active, .leave-active {
    transition: all ${duration}ms ${ease};
  }
  .leave-active {
    position: ${mode !== 'out-in' ? 'absolute' : 'initial'};
  }
  .enter-from {
    transform: translate(${x}, ${y});
    opacity: 0;
  }
  .enter-to {
    opacity: 1;
    transform: none;
  }
  .leave-from {
    opacity: 1;
    transform: none;
  }
  .leave-to {
    opacity: ${opacity};
    transform: translate(${x}, ${y});
  }`,
  ...opts
});
};