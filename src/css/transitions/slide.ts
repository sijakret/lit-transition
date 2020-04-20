import {CSSTransition} from './_utils';
export function slide({
    duration = 500,
    x = '100%',
    y = '0%',
    ease = 'ease-out',
    opacity = 0.0,
    mode = 'in-out'
  } = {}) {
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
  ...arguments[0]
});
};