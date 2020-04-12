import {
  NodePart,
  TemplateResult
} from 'lit-html';
import {
  unpackMarked
} from './utils'

const setup = new WeakMap();

export function transitionBase(flow:any) {
 
  return (tr:TemplateResult, transition : any)  => {
    return async (container:NodePart) => {
      if (!(container instanceof NodePart)) {
        throw new Error('The `transition` directive must be used on nodes');
      }

      const {
        tr: incoming,
        name
      } = unpackMarked(tr);
  
      // data for container
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
        part.clear();
      }
  
      // perform enter transition
      async function enterFlow(part:NodePart) {
        // first mount element
        await flow.transition(part, enter);
      }
  
      // perform enter transition
      async function leaveFlow(part:NodePart) {
        await flow.transition(part, leave);
        remove(part);
      }
  
      // init container
      if(!data) {
        setup.set(container, data = {
          children: new Map<TemplateResult, NodePart>(),
          styles: new Map<TemplateResult, NodePart>()
        });
      }

      // same template? no animation! 
      if(data.last && !!name && name === data.name) {
        // simply commit
        data.last.setValue(incoming);
        data.last.commit();
        return;
      }
  
      // update css
      if(flow.init) {
        flow.init({
          transition,
          data,
          add,
          remove
        });
      }      
      if(mode === 'out-in') {
        data.last && await leaveFlow(data.last);
      } else {
        data.last && leaveFlow(data.last);
      }
      enterFlow(data.last = add(incoming));
      data.name = name;
      data.lastTemplate = incoming;
    }
  }  
}
