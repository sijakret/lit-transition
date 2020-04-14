import {
  NodePart,
  directive
} from 'lit-html';

import {transitionBase} from './transition-base';
import {defaultTransition} from './styles';

export * from './styles';
export {mark} from './utils';
export const transition = directive(function(elem:any, opts:any = defaultTransition) {
  if(typeof opts === 'function') {
    opts = opts();
  }
  return transitionBase(flow)(elem, opts);
});



// takes care of scheduling css transitons
import classList from './class-list';
import {nextFrame, partDom, applyExtents, recordExtends} from './utils';
const flow = {
  async transition(part:NodePart, classes:any) {
    if(typeof classes === 'string' || Array.isArray(classes)) {
      classes = {
        active: classes
      };
    }
    // destructure params
    const {
      active,
      from,
      to,
      lock
    } = classes;
    const dom = partDom(part);

    let extents: any;
    if(lock) {
      extents = recordExtends(dom);
    }
    await new Promise(async resolve => {
      const id = Math.random();
      const cl = classList(dom);
      const add = (c:Array<string>) => Array.isArray(c) ?
        c.forEach((i:string) => cl.add(i)) : cl.add(c);
      const remove = (c:Array<string>) => Array.isArray(c) ?
        c.forEach((i:string) => cl.remove(i)) : cl.remove(c);

      const cancelled = !!dom.__transition_id;
      if(cancelled) {
        await dom.__cancel__transition();
        active && add(active);
      }
  
      // wait for dom to update initially
      await nextFrame();
      if(extents) {
        applyExtents(dom, extents);
      }
      dom.__transition_id = id;
      dom.__cancel__transition = async () => {
        delete dom.__cancel__transition;
        delete dom.__transition_id;
        active && remove(active);
        from && remove(from);
        to && remove(to);
        resolve();
      }
      active && add(active);
      !cancelled && from && add(from);
      await nextFrame();
      !cancelled && from && remove(from);
      to && add(to);
      // wait for transition to complete
      const done = async () => {
        if(dom.__transition_id === id) {
          await dom.__cancel__transition();
        }
      }
      dom.addEventListener('transitionend', done, {once: true})
      dom.addEventListener('animationend', done, {once: true})
    });
  },
  init({data,remove,add,transition}:{data:any,remove:any,add:any,transition:any}) {
    data.css && remove(data.css);
    data.css = add(transition.css);
  }
};