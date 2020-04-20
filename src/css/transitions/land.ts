import {CSSTransition} from './_utils';

export function land({
  duration = 500,
  ease = 'ease-in',
  opacity = 0.0
  } = {}) {
  return CSSTransition({
    css:`
  .enter-active {
    transition: opacity ${duration}ms ${ease},
      transform-origin ${duration}ms ${ease},
      transform ${duration}ms ${ease};
  }
  .enter-from {
    opacity: ${opacity}
    transform-origin: 0% 50%;
    transform: scale(2);
  }
  .enter-to {
    transform: none;
    opacity: 1;
  }`,
  leave: false
  });
};