import { NodePart, html} from 'lit-html';
import classList from './class-list';
import {partDom, applyExtents, recordExtents, pageVisible, classChanged} from '../core/utils';

// describes scheduling css transitons
export const flow = {
  async transition(part:NodePart, classes:any, global: any) {
    // make sure we never animate on hidden windows
    if(!pageVisible()) {
      return;
    }
    // destructure params
    const {
      duration = global.duration,
      active,
      from,
      to,
      lock
    } = classes;
    const dom = partDom(part);
    if(!dom) {
      // animation was cancelled?
      return;
    }
    //const parent = dom.parentNode;
    let extents: any;
    if(lock) {
      extents = recordExtents(dom);
    }
    await new Promise(async resolve => {
      //  const id = Math.random();
      const cl = classList(dom);
      const add = (c:Array<string>) => Array.isArray(c) ?
        c.forEach((i:string) => cl.add(i)) : cl.add(c);
      const remove = (c:Array<string>) => Array.isArray(c) ?
        c.forEach((i:string) => cl.remove(i)) : cl.remove(c);

      // in this case we apply a previously recorded
      // geometry
      if(extents) {
        applyExtents(dom, extents);
      }

      // called once transition is completed
      function done(e:Event) {
        // Remove all unused hooks
        ['transitionend','transitioncancel'
        ,'animationend','animationcancel']
        .filter(type => !e || type !== e.type)
        .forEach(type => dom.removeEventListener(type, done));

        // remove all classes we added and resolve
        remove([active, from, to]);
        resolve();
      }
      
      // Register these hooks before we set the css
      // class es that will trigger animations
      // or transitions
      const o = {once:true};
      if(duration) {
        setTimeout(done, duration);
      } else {
        dom.addEventListener('transitionrun', function() {
          dom.addEventListener('transitionend', done, o);
          dom.addEventListener('transitioncancel', done, o);
        }, o);
        dom.addEventListener('animationstart', function() {
          dom.addEventListener('animationend', done, o);
          dom.addEventListener('animationcancel', done, o);
        }, o);
      }

      await classChanged(dom, () => add(from));
      await classChanged(dom, () => add(active));

      from && remove(from);
      to && add(to);
      
    });
  },
  // injects style tags
  init({data,remove,add,transition}:{data:any,remove:any,add:any,transition:any}) {
    let css = transition.css;
    css = typeof css === 'string' ? html`<style>${css}</style>`: css;
    data.css && remove(data.css);
    data.css = add(css);
  }
};