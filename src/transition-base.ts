import {
  NodePart,
  TemplateResult
} from 'lit-html';
import {
  sameTemplate,
  sameValues
} from './utils'

const setup = new WeakMap();

export function transitionBase(flow:any) {
 
  return (incoming:TemplateResult, opts : any)  => {
    const { transition } = opts;
    return async (container:NodePart) => {
      if (!(container instanceof NodePart)) {
        throw new Error('The `transition` directive must be used on nodes');
      }
  
      // data for container
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
        part.clear();
      }
  
      // perform enter transition
      async function enter(part:NodePart) {
        // first mount element
        flow.transition(part, transition.enter);
      }
  
      // perform enter transition
      async function leave(part:NodePart) {
        await flow.transition(part, transition.leave);
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
      if(data.last && sameTemplate(data.last, incoming) && sameValues(data.last,incoming)) {
        // simply commit
        data.last.setValue(incoming);
        data.last.commit();
        return;
      }
  
      // update css
      if(flow.init) {
        flow.init({
          opts,
          data,
          add,
          remove
        });
      }      
      data.last && leave(data.last);
      enter(data.last = add(incoming));
      data.lastTemplate = incoming;
      container.commit();
    }
  }  
}
