
export const transPage = {
  enter: ['animated', 'bounceIn', 'top'],
  leave: {
    active: ['animated', 'bounceOut', 'top', 'fixed'],
    lock: true
  },
  mode: 'out-in'
};
export const transTitle = {
  enter: ['animated', 'zoomIn', 'top'],
  leave: {
    active: ['animated', 'zoomOut', 'top', 'fixed'],
    lock: true
  }
};
export const transContent = transTitle;