import { CSSTransitionOptions, TransitionMode } from '../interfaces';
import { instantiateDefault, mergeObjects as merge } from '../utils';

interface CSSSlideOptions extends CSSTransitionOptions  {
  duration?: number
  ease?: string
  opacity?: number
  leavePosition?: string
  x?: string
  y?: string
  x1?: string
  y1?: string
}

/**
 * simple slide transition
 * TODO
 */
export const slide = instantiateDefault(
  function slide(opts:CSSSlideOptions = {}) {
    let {
      duration = 500,
      x = '100%',
      y = '0%',
      x1 = '',
      y1 = '',
      ease = 'ease-out',
      leavePosition = '',
      mode,
      opacity = 0.0,
    } = opts;
    x1 = x1 || x;
    y1 = y1 || y;
    return merge(opts, {
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
      position: ${leavePosition
        || (mode !== TransitionMode.OutIn ? 'absolute': 'initial')};
      transition: transform ${duration}ms ${ease}, opacity ${duration}ms ${ease};
    }
    .slide-leave-to {
      opacity: ${opacity};
      transform: translate(${x}, ${y});
    }
    .slide-enter-from {
      opacity: ${opacity};
      transform: translate(${x1}, ${y1});
    }`,
    mode
  })
})