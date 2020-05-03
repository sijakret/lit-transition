import { CSSTransitionOptions, TransitionMode } from '../interfaces';
import { instantiateDefault, mergeObjects as merge } from '../utils';

interface CSSSlideOptions extends CSSTransitionOptions  {
  duration?: number
  ease?: string
  opacity?: number
  leavePosition?: string
  left?:Boolean
  right?:Boolean
  up?:Boolean
  down?:Boolean
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
    const {left,right,up,down} = opts;
    let simple = {};
    left && (simple = {
      x:'-100%',  // slide out to right ..
      x1:'100%' // .. and in from left
    });
    right && (simple = {
      x:'100%',  // slide out to right ..
      x1:'-100%' // .. and in from left
    });
    up && (simple = {
      y:'100%',  // slide out to right ..
      y1:'-100%' // .. and in from left
    });
    down && (simple = {
      y:'-100%',  // slide out to right ..
      y1:'100%' // .. and in from left
    });
    let {
      mode,
      duration = 500,
      x = '100%',
      y = '0%',
      x1 = '',
      y1 = '',
      ease = 'ease-out',
      leavePosition = '',
      opacity = 0.0,
    } = {
      ...simple,
      ...opts
    };
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