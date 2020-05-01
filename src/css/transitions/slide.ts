import { CSSTransitionOptions } from '../interfaces';
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
      opacity = 0.0,
    } = opts;
    return {
      enter: {
        active: 'slide-enter-active',
        from: 'slide-enter-from',
        to: 'slide-enter-to',
      },
      leave: {
        active: 'slide-leave-active',
        from:  'slide-leave-from',
        to: 'slide-leave-to',
        lock: true
      },
      css:`
    .slide-enter-active, .slide-leave-active {
      transition: transform ${duration}ms ${ease}, opacity ${duration}ms ${ease};
    }
    .slide-enter-from, .slide-leave-to {
      opacity: ${opacity};
      transform: translate(${x}, ${y});
    }`,
    ...opts
  }
})