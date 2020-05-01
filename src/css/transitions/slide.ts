import { CSSTransitionOptions, TransitionMode } from '../interfaces';
import { instantiateDefault } from '../utils';

interface CSSSlideOptions extends CSSTransitionOptions  {
  duration?: number
  ease?: string
  opacity?: number
  x?: string
  y?: string
}

export const slide = instantiateDefault(
  function slide(opts:CSSSlideOptions = {}) {
    const {
      duration = 500,
      x = '100%',
      y = '0%',
      ease = 'ease-out',
      mode,
      opacity = 0.0,
    } = opts;
    return {
      enter: {
        active: 'slide-enter-active',
        from: 'slide-enter-from'
      },
      leave: {
        active: 'slide-leave-active',
        to: 'slide-leave-to',
      },
      css:`
    .slide-enter-active {
      transition: transform ${duration}ms ${ease}, opacity ${duration}ms ${ease};
    }
    .slide-leave-active {
      position: ${mode !== TransitionMode.OutIn ? 'absolute': 'initial' };
      transition: transform ${duration}ms ${ease}, opacity ${duration}ms ${ease};
    }
    .slide-enter-from, .slide-leave-to {
      opacity: ${opacity};
      transform: translate(${x}, ${y});
    }`,
    mode,
    ...opts
  }
})