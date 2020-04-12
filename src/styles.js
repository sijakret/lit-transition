import {html} from 'lit-html';

export class Transition {
  constructor(css) {
    this.css = html`<style>${css}</style>`;
  }
};

const def = (css) => ({
  transition: new Transition(css)
});

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




