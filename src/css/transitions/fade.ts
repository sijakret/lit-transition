import {CSSTransition} from './_utils';

export function fade({
  duration = 500,
  ease = 'ease-out',
  opacity = 0.0,
  mode = 'in-out'
} = {}) {
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
  `});
};