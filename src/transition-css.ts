import {
  NodePart,
  directive
} from 'lit-html';

import {transitionBase} from './transition-base';
import {defaultTransition} from './predefined-css';

export * from './predefined-css';
export {mark} from './utils';

export const transition = directive(function(elem:any, opts:any = defaultTransition) {
  if(typeof opts === 'function') {
    opts = opts();
  }
  return transitionBase(flow)(elem, opts);
});


// takes care of scheduling css transitons
import classList from './class-list';
import {partDom, applyExtents, recordExtents, pageVisible, classChanged} from './utils';
const flow = {
  async transition(part:NodePart, classes:any) {
    // make sure we never animate on hidden windows
    if(!pageVisible()) {
      return;
    }
    // wait for dom to update initially
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
      lock,
      //timeout = true
    } = classes;
    const dom = partDom(part);
    const parent = dom.parentNode;
    let extents: any;
    if(lock) {
      extents = recordExtents(dom);
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
  
      // in this case we apply a previously recorded
      // geometry
      if(extents) {
        applyExtents(dom, extents);
      }
      dom.__transition_id = id;
      // called once transition is completed
      function done() {
        if(dom.__transition_id === id) {
          dom.__cancel__transition();
        } else {
        }
        //document.removeEventListener('visibilitychange', done);
      }
      dom.__cancel__transition = async () => {
        delete dom.__cancel__transition;
        delete dom.__transition_id;
        remove(active);
        remove(from);
        remove(to);
        resolve();
      }
      // let begin:string[] = [];
      // active && begin.push(active);
      // from && begin.push(from);
      // await classChanged(dom, () => add(begin));
      await classChanged(dom, () => add(from));
      await classChanged(dom, () => add(active));
      from && remove(from);
      
      parent.addEventListener('transitionrun', () => {
        parent.addEventListener('transitionend', done, {once: true});
        parent.addEventListener('transitioncancel', done, {once: true});
      }, {once: true});
      parent.addEventListener('animationstart', () => {
        parent.addEventListener('animationend', done, {once: true});
        parent.addEventListener('animationcancel', done, {once: true});
      }, {once: true});

      to && add(to);
      
      // if(running) {
      //   // in case end events don't fire if tab is hidden
      //   if(timeout === true) {
      //     // cancel on hide/show window
      //     //document.addEventListener('visibilitychange', done);
      //   } else if(Number(timeout)) {
      //     // cancel after time
      //     setTimeout(done, Number(timeout));
      //   }
        
      // } else {

      //   done();
      // }
      

      
    });
  },
  init({data,remove,add,transition}:{data:any,remove:any,add:any,transition:any}) {
    data.css && remove(data.css);
    data.css = add(transition.css);
  }
};