import {
  NodePart,
  directive
} from 'lit-html';

import classList from './class-list';
import {nextFrame, partDom} from './utils';
import {transitionBase} from './transition-base';

// takes care of scheduling css transitons
const flow = {
  async transition(part:NodePart, type:string) {
    await new Promise(async resolve => {
      const name = 'anim';
      const id = Math.random();
      const dom = partDom(part);
      const cl = classList(dom);
      const cancelled = !!dom.__transition_id;
      if(cancelled) {
        await dom.__cancel__transition();
        cl.add(`${name}-active`);
      }
  
      // wait for dom to update initially
      await nextFrame();
      dom.__transition_id = id;
      dom.__cancel__transition = async () => {
        delete dom.__cancel__transition;
        delete dom.__transition_id;
        cl.remove(`${name}-active`);
        cl.remove(`${name}-${type}-active`);
        cl.remove(`${name}-${type}-to`);
        cl.remove(`${name}-${type}`);
        resolve();
      }
      cl.add(`${name}-${type}-active`);
      cl.add(`${name}-active`);
      !cancelled && cl.add(`${name}-${type}`);
      await nextFrame();
      !cancelled && cl.remove(`${name}-${type}`);
      cl.add(`${name}-${type}-to`);
      // wait for transition to complete
      dom.addEventListener('transitionend', async () => {
        if(dom.__transition_id === id) {
          await dom.__cancel__transition();
          // cl.remove(`${name}-active`);
          // cl.remove(`${name}-${type}-active`);
          // cl.remove(`${name}-${type}-to`);
          // cl.remove(`${name}-${type}`);
        }
      }, {once: true})
    });
  },
  init({data,remove,add,opts}:{data:any,remove:any,add:any,opts:any}) {
    data.css && remove(data.css);
    data.css = add(opts.transition.css);
  }
};


export * from './styles';
export const transition = directive(function(elem:any, opts:any = {}) {
  return transitionBase(flow)(elem, opts);
});
