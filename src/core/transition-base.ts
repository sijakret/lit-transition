import {
  NodePart,
  TemplateResult,
  html
} from 'lit-html';
import {
  marked,
  pageVisible
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
        tr = html`<div style="display: inline-block">${tr}</div>`;
      }

      // see if template was marked
      // the name is used to decide if consider
      // an animation to have happened
      const name = marked(tr);

      const {
        enter,
        leave,
        onEnter,
        onLeave,
        onAfterEnter,
        onAfterLeave,
        mode = 'in-out'
      } = transition;

      // data is used to store some state data
      // per container
      let data = setup.get(container);
      
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

      // in case the page is not visible
      // we skip all animations but still call the
      // corresponding hooks to stay transparent
      // in regards to app logic
      if(!pageVisible()) {
        data && data.last && remove(data.last);
        // simply update dom and call hooks
        onLeave && await onLeave();
        onAfterLeave && await onAfterLeave();
        onEnter && await onEnter();
        data && (data.last = add(tr));
        onAfterEnter && await onAfterEnter();
        return;
      }
  
      // perform enter transition
      async function enterFlow(part:NodePart) {
        // first mount element
        onEnter && await onEnter();
        enter && await flow.transition(part, enter, transition);
        onAfterEnter && await onAfterEnter();
      }
  
      // perform enter transition
      async function leaveFlow(part:NodePart) {
        onLeave && await onLeave();
        leave && await flow.transition(part, leave, transition);
        remove(part);
        onAfterLeave && await onAfterLeave();
      }
  
      // init container
      if(!data) {
        setup.set(container, data = {
          children: new Map<TemplateResult, NodePart>(),
          styles: new Map<TemplateResult, NodePart>(),
          transition
        });
      }

      // important in case transition has changed
      // init flow, like to init css
      // init must be laze
      flow.init && flow.init({
        transition,
        data,
        add,
        remove
      })

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
          // delete data.last;
          last && await leaveFlow(last);
          // trigger enter and remember part
          // it will be pased to leaveFlow
          // on the next transition
          await enterFlow(data.last = add(tr));
        } else {
          // mode === 'both'
          // here we don't wait so we trigger enter
          // and leave right away
          data.last && leaveFlow(data.last),
          // trigger enter and remember part
          // it will be pased to leaveFlow
          // on the next transition
          await enterFlow(data.last = add(tr));
        }
      }
    }
  }  
}
