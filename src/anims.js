
const def = transition => ({
  transition
});

export const swipe = function({
  duration = 0.2,
  direction = 'right',
  opacity = 0
}) {
  let move = {};
  if(direction === 'right') {
    move = {
      e: ['translatex(-100%)', 'translatex(0%)'],
      l: ['translatex(0%)', 'translatex(100%)'],
    }
  }
  if(direction === 'left') {
    move = {
      e: ['translatex(100%)', 'translatex(0%)'],
      l: ['translatex(0%)', 'translatex(-100%)']
    }
  }
  return def({
    enter: [{
      opacity: [opacity, 1],
      transform: move.e,
    }, {
      duration: duration * 1000
    }],
    leave: [{
      position: ['absolute','absolute'],
      opacity: [1, opacity],
      transform: move.l,
    }, {
      duration: duration * 1000
    }]
  });
};

export const land = function({
  duration = 0.8,
  direction = 'right',
  easing = 'ease-out',
  transformOrigin = 'left',
  x = '30px',
  y = '30px',
  scale = 1,
  delay = 0,
  opacity = 0
} = {}) {
  let move = {
    e: {
      transform: [`scale(${scale}) translate(${x},${y})`, 'scale(1) translate(0px,0px)']
    },
    l: {
      transform: ['translatex(0%)', `translate(${x},${y})`]
    }
  }
  let pos = null;
  return def({
    enter: {
      animation: [{
        ...move.e,
        opacity: [opacity,1]
      },
      {
        easing,
        duration,
        delay,
        fill: 'both'
      }]
    },
    leave: {
      animation: [
        {
          ...move.l,
          filter: ['blur(0px)', 'blur(1px)'],
          zIndex: ['-1','-1'],
          opacity: [1,opacity]
        },
        {
          easing,
          duration,
          delay,
          fill: 'both'
      }],
      init(e) {
        lockExtents(e);
        pos = e.style.position;
        e.style.transformOrigin = transformOrigin;
      },
      uninit(e) {
        e.style.position = pos;
        e.style.transformOrigin = transformOrigin;
      }
    }
  });
};

function lockExtents(e) {
  const rect = e.getBoundingClientRect();
  const style = e.currentStyle || window.getComputedStyle(e);
  let mt = parseFloat(style.marginTop) || 0;
  let ml = parseFloat(style.marginLeft) || 0;
  let scrollTop = 0;
  let scrollLeft = 0;
  {
    let p = e;
    while(p && p != e.offsetParent) {
      scrollTop += p.scrollTop;
      scrollLeft += p.scrollLeft;
      p = p.parentElement;
    }
  }
  e.style.left = (e.offsetLeft-ml-scrollLeft)+'px';
  e.style.top = (e.offsetTop-mt-scrollTop)+'px';
  e.style.width = (rect.width)+'px';
  e.style.height = (rect.height)+'px';
  e.style.position = 'absolute';
}






