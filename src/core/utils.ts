
import {
  NodePart,
  TemplateResult,
  TemplateInstance
} from 'lit-html';

export function nextFrame(n = 1):Promise<void> {
  return new Promise(resolve => 
    --n === 0 ? requestAnimationFrame(() => resolve()) :
      resolve(nextFrame(n)));
}

/**
 * resolves once the class attribute of a node
 * has been consolidated
 * @param node DOMNode
 */
export function classChanged(node:HTMLElement, cb:Function|null = null, skipFrame:Boolean = true) {
  return new Promise(resolve => {
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(async () => {
      // Later, you can stop observing
      observer.disconnect();
      skipFrame && await nextFrame();
      resolve();
    });
    // Start observing the target node for configured mutations
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["class"]
    });
    cb && cb();
  });

}

export function partDom(part:NodePart):any {
  return part.startNode.nextSibling;
}

export function sameTemplate(part:NodePart, value:TemplateResult) {
  const template = part.options.templateFactory(value);
  return (part.value instanceof TemplateInstance &&
      part.value.template === template)
}

export function sameValues(part:any, tr:any) {
  tr = Array.isArray(tr) ? tr : tr.values;
  if(!part.value.__parts) {
    return part.value === tr.value;
  }
  return part.value.__parts.reduce((a:Boolean,p:any,i:any) => {
    a &&p !== undefined && sameValues(p, tr[i])
  }, true);
}

const markedTemplates = new WeakMap<TemplateResult,String>();

export function mark(templateResult:TemplateResult, name:String) {
  markedTemplates.set(templateResult, name);
  return templateResult;
}

export function marked(templateResult:TemplateResult) {
  return markedTemplates.get(templateResult);
}

/**
 * records geometry of a dom node
 */
export function recordExtents(e:HTMLElement) {
  const rect = e.getBoundingClientRect();
  const style = window.getComputedStyle(e);
  let top = e.offsetTop - parseFloat(style.marginTop) || 0;
  let left = e.offsetLeft - parseFloat(style.marginLeft) || 0;
  {
    let p:any = e;
    do {
      p = p.parentNode || p.host;
      if(!p) break;
      top -= p.scrollTop || 0;
      left -= p.scrollLeft || 0;
    } while(p != e.offsetParent)
  }
  return {
    left,
    top,
    rect,
    style
  }
}

/**
 * 
 * @param e 
 * @param ext 
 */
export function applyExtents(e:HTMLElement, ext:any) {
  e.style.left = ext.left+'px';
  e.style.top = ext.top+'px';
  e.style.width = (ext.rect.width)+'px';
  e.style.height = (ext.rect.height)+'px';
}


export function lockExtents(e:HTMLElement, offset:Boolean = true) {
  const rect = e.getBoundingClientRect();
  const style = window.getComputedStyle(e);
  if(offset && style.position === "absolute") {

    let mt = parseFloat(style.marginTop) || 0;
    let ml = parseFloat(style.marginLeft) || 0;
    {
      let p:HTMLElement|null = e;
      while(p && p != e.offsetParent) {
        mt -= p.scrollTop;
        ml -= p.scrollLeft;
        p = p.parentElement;
      }
    }
    e.style.left = (e.offsetLeft-ml)+'px';
    e.style.top = (e.offsetTop-mt)+'px';
  }
  e.style.width = (rect.width)+'px';
  e.style.height = (rect.height)+'px';
}




let _visible:Boolean;
function updteVisibility(){
  _visible = !document.hidden;
}
updteVisibility();
document.addEventListener('visibilitychange', updteVisibility, false);

export function pageVisible() {
  return _visible;
}