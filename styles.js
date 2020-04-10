import {html} from 'lit-html';

export class Predefined {
  constructor(name, css) {
    this.name = name;
    this.css = html`<style>${css}</style>`;
  }
};

const def = (name, css) => new Predefined(name, css);

export const swipe = function({
  duration = 2,
  direction = 'right',
  ease = 'ease-out',
  opacity = 0.0} = {}) {

  const swap = direction === 'right' ? 'left' : 'right';
  return def(`swipe-${direction}`, `
  .swipe-${direction}-enter-active, .swipe-${direction}-leave-active {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    transition: opacity ${duration}s ${ease}, left ${duration}s ${ease}, right ${duration}s ${ease}, ${direction} ${duration}s ${ease};
  }
  .swipe-${direction}-enter {
    opacity: ${opacity};
  }
  .swipe-${direction}-leave-to {
    opacity: 1;
  }
  .swipe-${direction}-enter {
    ${direction}: 100%;
  }
  .swipe-${direction}-enter-to {
    ${direction}: 0%;
  }
  .swipe-${direction}-leave {
    ${swap}: 0%;
  }
  .swipe-${direction}-leave-to {
    ${swap}: 100%;
  }`);
};

export const fade = function({
  duration = 0.8,
  ease = 'ease-out',
  opacity = 0.0} = {}) {
  return def(`fade`, `
  .fade-enter-active, .fade-leave-active {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: opacity ${duration}s ${ease};
  }
  .fade-enter, .fade-leave-to {
    opacity: ${0};
  }
  `);
};




