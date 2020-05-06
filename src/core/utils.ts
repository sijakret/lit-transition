
import {
  NodePart,
  TemplateResult
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
export function classChanged(node:HTMLElement, cb:Function|null, skipFrame:Boolean = true) {
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

/**
 * marked templates are kept in a global weak map
 */
const markedTemplates = new WeakMap<TemplateResult,String>();
export function mark(templateResult:TemplateResult, name:String) {
  markedTemplates.set(templateResult, name);
  return templateResult;
}

export function marked(templateResult:TemplateResult) {
  return markedTemplates.get(templateResult);
}

/**
 * records geometry of a dom node so it can
 * be reaplied later on
 */
export function recordExtents(e:any) {
  const rect = e.getBoundingClientRect();
  // // we separately track margins
  // // so in case the changed when the extents
  // // are reapplied (like when a fixed margin is used)
  // // we can compensate
  // const style = window.getComputedStyle(e);
  // const marginTop = parseFloat(style.marginTop) || 0;
  // const marginLeft = parseFloat(style.marginLeft) || 0;
  let top = 0; //-marginTop;
  let left = 0; // -marginLeft;
  {
    let offsetParent:Element|null = e.offsetParent;
    while(e && e !== document && !(e instanceof DocumentFragment)) {
      if(e === offsetParent) {
        break;
      }
      // not accounting for margins here
      // since in case of margin: auto, offset
      // may actually be the auto margin
      // const style = window.getComputedStyle(e);
      top += e.offsetTop - (e.scrollTop || 0);
      left += e.offsetLeft - (e.scrollLeft || 0);
      e = e.parentNode || (e as any).host;
    } 
  }
  return {
    left,
    top,
    width: rect.width,
    height: rect.height
  }
}

/**
 * applies left,top,width and height form ext
 * also sets marginLeft+Top to 0
 * @param e HTMLElement to apply extents to
 * @param ext extents object
 */
export function applyExtents(e:HTMLElement, ext:any) {
  e.style.marginLeft = '0px';
  e.style.marginTop = '0px';
  e.style.left = (ext.left) + 'px';
  e.style.top = (ext.top) + 'px';
  e.style.width = (ext.width) + 'px';
  e.style.height = (ext.height) + 'px';
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