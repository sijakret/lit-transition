import {html} from 'lit-html';

export class CssTransition {
  constructor(opts = {}) {
    const {
      css,
      enter={},
      leave={},
      mode='in-out'
    } = opts;
    this.css = html`<style>${css}</style>`;
    this.enter = enter != false ? {
      active: 'enter-active',
      from: 'enter-from',
      to: 'enter-to',
      ...enter
    } : false;
    this.leave = leave != false ? {
      active: 'leave-active',
      from: 'leave-from',
      to: 'leave-to',
      lock: mode === 'in-out',
      ...leave
    } : false;
    this.mode = mode;
  }
};


export function slide(opts = {}) {
  const {
    duration = 500,
    x = '100%',
    y = '0%',
    ease = 'ease-out',
    opacity = 0.0
  } = opts;
  return new CssTransition({
    css:`
  .enter-active, .leave-active {
    transition: all ${duration}ms ${ease};
  }
  .leave-active {
    position: ${opts.mode !== 'out-in' ? 'absolute' : 'initial'};
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
    opacity: 0;
    transform: none;
  }
  .leave-to {
    opacity: ${opacity};
    transform: translate(${x}, ${y});
  }`,
  ...opts,
  leave: {lock:true}
});
};

export function fade({
  duration = 500,
  ease = 'ease-out',
  opacity = 0.0} = {}) {
  return new CssTransition({
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
    position: absolute;
  } 
  .enter-from, .leave-to {
    opacity: 0;
  }
  .enter-to, .leave-from {
    opacity: 1;
  }
  `});
};

export function land({
  duration = 500,
  ease = 'ease-in',
  opacity = 0.0} = {}) {
  return new CssTransition({
    css:`
  .enter-active {
    transition: opacity ${duration}ms ${ease},
      transform-origin ${duration}ms ${ease},
      transform ${duration}ms ${ease};
  }
  .enter-from {
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

export const defaultTransition = fade;