import {
  NodePart,
  TemplateResult,
  html
} from 'lit-html';
import {
  marked,
  //nextFrame
} from './utils'

const setup = new WeakMap();

// generates a directive
export function transitionBase(flow:any) {
  // generated directive
  return function _transition(tr:TemplateResult|any, transition : any) {
    return async (container:NodePart) => {
      if (!(container instanceof NodePart)) {
        throw new Error('The `transition` directive must be used on nodes');
      }

      // skip empty templates
      if(!tr) {
        tr = html`<div></div>`;
      }

      if(typeof tr === 'string' || typeof tr === 'number') {
        tr = html`<div>${tr}</div>`;
      }
      
      // most likely bullshit
      // // wait for promises
      // if(tr instanceof Promise) {
      //   _transition(await tr, transition);
      //   return;
      // }

      // // eval functions
      // if(tr instanceof Function) {

      //   const part = new NodePart(container.options);
      //   part.appendIntoPart(container);

      //   //tr(part)
      //   return;
      // }

      // see if template was marked
      // the name is used to decide if consider
      // an animation to have happened
      const name = marked(tr);
  
      // data is used to store some state data
      // per container
      let data = setup.get(container);

      const {
        enter,
        leave,
        mode = 'in-out'
      } = transition;
  
      // adds new template result
      function add(e:TemplateResult) {
        const part = new NodePart(container.options);
        part.appendIntoPart(container);
        part.setValue(e);
        part.commit();
        return part;
      }
  
      // removes a template result
      function remove(part:NodePart) {
        const {startNode:s, endNode:e} = part;
        part.clear();
        s && s.parentNode && s.parentNode.removeChild(s);
        e && e.parentNode && e.parentNode.removeChild(e);
      }
  
      // perform enter transition
      async function enterFlow(part:NodePart) {
        // first mount element
        enter && await flow.transition(part, enter);
      }
  
      // perform enter transition
      async function leaveFlow(part:NodePart) {
        leave && await flow.transition(part, leave);
        remove(part);
      }
  
      // init container
      if(!data) {
        setup.set(container, data = {
          children: new Map<TemplateResult, NodePart>(),
          styles: new Map<TemplateResult, NodePart>()
        });
        flow.init && flow.init({
          transition,
          data,
          add,
          remove
        });
        //await nextFrame();
      }

      // same template? no animation! 
      if(data.last && !!name && name === data.name) {
        // simply commit
        data.last.setValue(tr);
        data.last.commit();
      } else {
        // init flow, like to init css
        
        
        // execute actual flow
        if(mode === 'out-in') {
          // in this case we wait for leave
          // to finish before we enter
          data.last && await leaveFlow(data.last);
        } else {
          // here we don't wait so we trigger enter
          // right away
          data.last && leaveFlow(data.last);
        }
        // trigger enter and remember part
        // it will be pased to leaveFlow
        // on the next transition
        enterFlow(data.last = add(tr));

        // remember what template we are currently showing
        data.name = name;
      }
  
      
    }
  }  
}
