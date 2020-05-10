import {
  NodePart,
  TemplateResult
} from 'lit-html';
import classList from './class-list';

export function nextFrame(n = 1):Promise<void> {
  return new Promise(resolve => 
    --n === 0 ? requestAnimationFrame(() => resolve()) :
      resolve(nextFrame(n)));
}

/**
 * get parent skipping over fragments
 * @param elem input element
 */
function parentElement(elem:HTMLElement):HTMLElement|null {
  let e = elem;
  while(e = (e.parentNode || (e as any).host)) {
    if(e instanceof HTMLElement) {
      return e;
    }
  }
  return null;
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
 * tries to figure out if the geometry of an object
 * should be locked. will return true if e will have
 * position: absolute and parent has position: relative;
 * @param e element
 * @param activeCass className that would be applied
 */
export function needsLock(e:HTMLElement, activeClass:string) {
  const parent = parentElement(e);
  if(parent) {
    // createa a div with active class to peek if
    // it will be positioned relatively;
    const position = (() => {
      const div = document.createElement('div');
      const cl = classList(div);
      // remove not needed since we detach child alltogether
      const add = (c:any) => Array.isArray(c) ?
        c.forEach((i:string) => cl.add(i)) : cl.add(c);
      // use shadowRoot for peeking if available!
      const root = parent.shadowRoot || parent;
      add(activeClass);
      root.appendChild(div);
      const style = window.getComputedStyle(div);
      const position = style.position;
      // peeking done remove child
      root.removeChild(div);
      return position;
    })()
    if(position === 'absolute') {
      const style = window.getComputedStyle(parent);
      return style.position === 'relative';
    }
  }
  return false;
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
      e = parentElement(e);
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
function updatePageVisibility(visible = !document.hidden){
  _visible = visible;
}
updatePageVisibility();
document.addEventListener('visibilitychange', () => updatePageVisibility(), false);

if(process.env.DEBUG) {
  // @ts-ignore
  window.updatePageVisibility = updatePageVisibility;
}
  
export function pageVisible():Boolean {
  return _visible;
}