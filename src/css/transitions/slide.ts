import {
  CSSTransitionOptions,
  TransitionMode,
  GeometryLockMode
} from '../interfaces';
import {
  instantiateDefault,
  mergeObjects
} from '../utils';

interface CSSSlideOptions extends CSSTransitionOptions  {
  // easing options (default: ease-out)
  ease?: string
  // opacity at start of animation (default: 0)
  opacity?: number
  // duration in ms (default: 500)
  duration?: number
  // force positioning (default: undefined)
  leavePosition?: string
  // slide to left (default: false)
  left?:Boolean
  // slide to right (default: false)
  right?:Boolean
  // slide to up (default: false)
  up?:Boolean
  // slide to down (default: false)
  down?:Boolean
  // slide out target x (default: 100%)
  x?: string
  // slide out target y (default: 0%)
  y?: string
  // slide in start x (default: same as x)
  x1?: string
  // slide in start y (default: same as y)
  y1?: string
}

/**
 * simple slide transition
 * TODO
 */
export const slide = instantiateDefault('slide',
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
    return mergeObjects({
      enter: {
        active: 'slide-enter-active',
        from: 'slide-enter-from'
      },
      leave: {
        active: 'slide-leave-active',
        to: 'slide-leave-to',
        lock: GeometryLockMode.Auto
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
  }, opts)
})