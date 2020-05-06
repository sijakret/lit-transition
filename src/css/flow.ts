import { NodePart, html} from 'lit-html';
import classList from '../core/class-list';
import {
  partDom,
  applyExtents,
  recordExtents,
  pageVisible,
  classChanged,
  needsLock
} from '../core/utils';
import {
  GeometryLockMode
} from './interfaces'
 
/**
 * schedules css transitons
 */
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
      if(lock !== GeometryLockMode.Auto|| active && needsLock(dom, active)) {
        extents = recordExtents(dom);
      }
    }
    await new Promise(async resolve => {
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
        if(e) {
          // if e is set we have an actual event
          if(e.target !== dom) {
            // bubbled up from someone else, ignore..
            return;
          }
          // this event was meant for us
          // we handle it definitively
          e.preventDefault();
          e.stopPropagation();
        } 

        // Remove all the other excess hooks
        ['transitionend','transitioncancel'
        ,'animationend','animationcancel']
        .filter(type => !e || type !== e.type)
        .forEach(type => dom.removeEventListener(type, done));

        // remove all classes we added and resolve
        active && remove(active);
        from && remove(from);
        to && remove(to);
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

      // add actual transition classes
      from && await classChanged(dom, () => add(from));
      active && await classChanged(dom, () => add(active));

      from && remove(from);
      to && add(to);
    });
  },
  // injects style tags
  init({data,remove,add,transition}:{data:any,remove:any,add:any,transition:any}) {
    if(data._cssSource !== transition.css) {
      data.css && remove(data.css);
      if(!!transition.css) {
      // only init css if it has changed!
      data._cssSource = transition.css;
      let css = transition.css;
      css = typeof css === 'string' ? html`<style>${css}</style>`: css;
      data.css = add(css);
      }
    }
  }
};