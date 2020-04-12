
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