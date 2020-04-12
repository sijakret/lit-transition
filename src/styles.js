import {html} from 'lit-html';

export class Transition {
  constructor(css) {
    this.css = html`<style>${css}</style>`;
    this.leave = {
      active: 'enter-active',
      from: 'enter-from',
      to: 'enter-to',
    };
    this.enter = {
      active: 'leave-active',
      from: 'leave-from',
      to: 'leave-to',
    };
  }
};

const def = (css) => new Transition(css);

export const swipe = function({
  duration = 2,
  direction = 'right',
  ease = 'ease-out',
  opacity = 0.0} = {}) {

  const swap = direction === 'right' ? 'left' : 'right';
  return def(`
  .anim-active {
    position: absolute;
    transition: opacity ${duration}s ${ease}, left ${duration}s ${ease}, right ${duration}s ${ease}, ${direction} ${duration}s ${ease};
  }
  .anim-enter {
    opacity: ${opacity};
  }
  .anim-leave-to {
    opacity: 1;
  }
  .anim-enter {
    ${direction}: 100%;
  }
  .anim-enter-to {
    ${direction}: 0%;
  }
  .anim-leave {
    ${swap}: 0%;
  }
  .anim-leave-to {
    ${swap}: 100%;
  }`);
};

export const fade = function({
  duration = 0.8,
  ease = 'ease-out',
  opacity = 0.0} = {}) {
  return def(`fade`, `
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    transition: opacity ${duration}s ${ease};
  }
  .fade-enter, .fade-leave-to {
    opacity: ${0};
  }
  `);
};

export const land = function({
  duration = 2000,
  direction = 'right',
  ease = 'ease-out',
  opacity = 0.0} = {}) {
  return def(`
  .enter-active, .leave-active {
    position: fixed;
    transition: opacity ${duration}ms ${ease},
      left ${duration}ms ${ease},
      right ${duration}ms ${ease},
      ${direction} ${duration}ms
      ${ease};
  }
  .enter-to {
    opacity: ${opacity};
  }
  .leave-to {
    opacity: ${opacity};
  }`);
};

/*

  .anim-enter {
    ${direction}: 100%;
  }
  .anim-enter-to {
    ${direction}: 0%;
  }
  .anim-leave {
    ${swap}: 0%;
  }
  .anim-leave-to {
    ${swap}: 100%;
  }
  */


