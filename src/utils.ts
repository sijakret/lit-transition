
import {
  NodePart,
  TemplateResult,
  TemplateInstance
} from 'lit-html';

export function nextFrame(n = 1):Promise<void> {
  return new Promise(resolve => 
    --n === 0 ? requestAnimationFrame(() => resolve()) : nextFrame(n));
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

//const named = new WeakMap<TemplateResult,String>();

export class MarkedTemplateResult {
  tr:TemplateResult
  name: String

  constructor(tr:TemplateResult, name:String) {
    this.tr = tr;
    this.name = name;
  }
}
export function mark(tr:TemplateResult, name:String) {
  return new MarkedTemplateResult(tr,name);
}

export function unpackMarked(tr:TemplateResult|MarkedTemplateResult) {
  return tr instanceof MarkedTemplateResult ? {
    name: tr.name,
    tr: tr.tr
  } : {
    tr
  }
}

/**
 * records geometry of a dom node
 */
export function recordExtends(e:HTMLElement) {
  const rect = e.getBoundingClientRect();
  const style = window.getComputedStyle(e);
  let top = e.offsetTop - parseFloat(style.marginTop) || 0;
  let left = e.offsetLeft - parseFloat(style.marginLeft) || 0;
  {
    let p:HTMLElement|null = e;
    while(p && p != e.offsetParent) {
      top -= p.scrollTop;
      left -= p.scrollLeft;
      p = p.parentElement;
    }
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



