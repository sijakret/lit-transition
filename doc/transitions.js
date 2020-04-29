
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
};;