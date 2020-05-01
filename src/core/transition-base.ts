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
        throw new Error('The `transition` directive can only be used on nodes');
      }

      // skip empty templates
      if(!tr) {
        tr = html`<div></div>`;
      }

      if(typeof tr === 'string' || typeof tr === 'number') {
        tr = html`<div>${tr}</div>`;
      }

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
        onEnter,
        onLeave,
        onAfterEnter,
        onAfterLeave,
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
        try {
          s && part.clear();
        } catch(e) {
          // TODO: why does this happen?
          // out-in seems to have a bug..
        }
        s && s.parentNode && s.parentNode.removeChild(s);
        e && e.parentNode && e.parentNode.removeChild(e);
      }
  
      // perform enter transition
      async function enterFlow(part:NodePart) {
        // first mount element
        onEnter && onEnter();
        enter && await flow.transition(part, enter, transition);
        onAfterEnter && onAfterEnter();
      }
  
      // perform enter transition
      async function leaveFlow(part:NodePart) {
        onLeave && onLeave();
        leave && await flow.transition(part, leave, transition);
        remove(part);
        onAfterLeave && onAfterLeave();
      }
  
      // init container
      if(!data) {
        setup.set(container, data = {
          children: new Map<TemplateResult, NodePart>(),
          styles: new Map<TemplateResult, NodePart>()
        });
        // init flow, like to init css
        flow.init && flow.init({
          transition,
          data,
          add,
          remove
        });
      }

      // same template? no animation! 
      if(data.last && !!name && name === data.name) {
        // simply commit
        data.last.setValue(tr);
        data.last.commit();
      } else {
        // remember what template we are currently showing
        data.name = name;
        
        // execute actual flow
        if(mode === 'in-out') {
          const last = data.last;
          await enterFlow(data.last = add(tr));
          last && await leaveFlow(last);
        } else if(mode === 'out-in') {
          // in this case we wait for leave
          // to finish before we enter
          const last = data.last;
          //delete data.last;
          last && await leaveFlow(last);
          // trigger enter and remember part
          // it will be pased to leaveFlow
          // on the next transition
          enterFlow(data.last = add(tr));
        } else {
          // mode === 'both'
          // here we don't wait so we trigger enter
          // right away
          data.last && leaveFlow(data.last);
          // trigger enter and remember part
          // it will be pased to leaveFlow
          // on the next transition
          enterFlow(data.last = add(tr));
        }
      }
  
      
    }
  }  
}
