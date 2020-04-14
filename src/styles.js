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

export function swipe({
  duration = 300,
  direction = 'right',
  ease = 'ease-out',
  opacity = 0.0} = {}) {

  const swap = direction === 'right' ? 'left' : 'right';
  return def(`
  .enter-active {
    position: absolute;
    transition: opacity ${duration}ms ${ease}, left ${duration}ms ${ease}, right ${duration}ms ${ease}, ${direction} ${duration}ms ${ease};
  }
  .enter-from {
    opacity: ${opacity};
  }
  .leave-to {
    opacity: 1;
  }
  .enter-from {
    ${direction}: 100%;
  }
  .enter-to {
    ${direction}: 0%;
  }
  .leave-active {
    ${swap}: 0%;
  }
  .leave-to {
    ${swap}: 100%;
  }`);
};

export function fade({
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

export function land({
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

export const defaultTransition = swipe;