import {
  NodePart,
  directive
} from 'lit-html';

export * from './anims';
export {mark} from '../core/utils';

import {partDom} from '../core/utils';
import {transitionBase} from '../core/transition-base';
import 'web-animations-js';

 // takes care of scheduling transiton
 const flow = {
  async transition(part:NodePart, transition:any ) {
    
    await new Promise(async resolve => {
      const dom = partDom(part);
      if(transition.init) {
        transition.init(dom);
      }
      const animation = dom.animate(...transition.animation);
      animation.addEventListener('finish', async () => {
        if(transition.uninit) {
          transition.uninit(dom);
        }
        resolve();
      }, {once: true})
    });
  }
 }

export const transition = directive(function(elem:any, opts:any = {}) {
  if(typeof opts === 'function') {
    opts = opts();
  }
  return transitionBase(flow)(elem, opts);
});
