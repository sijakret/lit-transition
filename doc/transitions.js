/**
 * all transitions used in the documentation :)
 */

export const transLanding = {
  mode: 'out-in',
  enter: ['animated', 'bounceIn', 'top'],
  leave: {
    active: ['animated', 'bounceOut', 'top', 'fixed'],
    from: undefined,
    to: undefined,
    lock: true
  }
};

export const transTitle = {
  mode: 'both',
  enter: ['animated', 'zoomIn', 'top'],
  leave: {
    active: ['animated', 'zoomOut', 'top', 'fixed'],
    from: undefined,
    to: undefined,
    lock: true
  }
};

export const transContent = {
  mode: 'both',
  enter: ['animated', 'zoomIn', 'top'],
  leave: {
    active: ['animated', 'zoomOut', 'top', 'fixed'],
    from: undefined,
    to: undefined,
    lock: true
  }
};

export const transTeaser = {
  mode: 'both',
  css: `
  .flip3d-active {
    transition: all 1s cubic-bezier(.24,.89,.39,1.02);
  }
  .flip3d-start {
    opacity: 0.0;
    transform: rotate3d(1, 1, 0, -0.5turn) translate3d(-200px, 0, -200px);
  }
  .flip3d-done {
    opacity: initial;
    filter: initial;
    transform: initial;
  }
  .flip3d-end{
    opacity: 0.0;
    filter: blur(2px);
    transform: rotate3d(1, 1, 0, 0.1turn) translate3d(0, 0, -200px);
  }`,
  enter: {
    active: 'flip3d-active',
    to: 'flip3d-done',
    from: 'flip3d-start'
  },
  leave: {
    active: ['flip3d-active', 'fixed'],
    from: 'flip3d-done',
    to: 'flip3d-end',
    lock: true
  }
};

export const transWaitBar = (duration) => ({
  mode: 'both',
  duration: duration,
  css: `
  .bar-active {
    height: 5px;
    display: block;
    border-radius: 2px;
    margin: 3px;
    margin-top: 8px;
    background-size: 200% 5px;  
    background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 200%);
    transition: background-position ${duration}ms linear, opacity ${duration}ms linear;
  }
  .bar-start {
    background-position: 100%;  
    opacity: 1;
  }
  .bar-end {
    background-position: 0%;
    opacity: 0.2;
  }`,
  enter: {
    active: 'bar-active',
    from: 'bar-start',
    to: 'bar-end'
  },
  leave: false
});