import {CSSTransition} from './_utils';

export function land({
  duration = 500,
  ease = 'ease-in',
  opacity = 0.0
  } = {}) {
  return CSSTransition({
    css:`
  .enter-active, .leave-active {
    transform-origin: 0% 50%;
    transition: opacity ${duration}ms ${ease},
      transform-origin ${duration}ms ${ease},
      transform ${duration}ms ${ease};
  }
  .leave-active {
    position: absolute;
  }
  .enter-from {
    transform: translate(-100px, 0px) scale(3);
    opacity: ${opacity};
  }
  .enter-to, .leave-from {
    transform: none;
    opacity: 1;
  }
  .leave-to {
    opacity: ${opacity};
    transform: translate(0, 100px);
  }`,
  });
};