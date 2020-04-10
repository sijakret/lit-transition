
import {NodePart, html} from 'lit-html';
import {classMap} from 'lit-html/directives/class-map';
import {Predefined} from './styles';

const previous = new WeakMap();

export function transitionCSS(elem, opts) {

  if(opts instanceof Predefined) {
    opts = {
      css: opts.css,
      name: opts.name
    }
  }
  if(opts instanceof Function) {
    opts = opts();
  }

  if(!opts) {
    // no transition configured
    return container => container.setValue(elem);
  }

  let {
    duration = undefined,
    css = undefined,
    name = undefined
  } = opts;

  return (container) => {
    if (!(container instanceof NodePart)) {
      throw new Error('The `transition` directive must be used on nodes');
    }

    // get current and previous element
    // prev may not exist
    const prev = previous.get(container) || undefined;
    const next = elem; // guard([], () => elem);
    previous.set(container, elem);

    // initial configuration
    // always the same
    let a = [name+'-enter'];
    let b = [name+'-leave'];
    let eend = () => { }
    let lend = () => { }

    // configures classes of support dom
    function configure() {
      container.setValue( html`
      ${css}
      <div class=${
        classMap(a.reduce((acc,i) => ({...acc, [i]: true }), {}))
      }
      @transitionend=${() => eend()}
      @animationend=${() => eend()}
      >${next}</div>
      ${b&&prev ?
        html `<div class=${
          classMap(b.reduce((acc,i) => ({...acc, [i]: true }), {}))
          }
          @transitionend=${() => lend()}
          @animationend=${() => lend()}
          >${prev}</div>`
        : undefined
      }`
      );
      container.commit();
    } 

    // configure initially
    configure();

    // execute cycle
    requestAnimationFrame( () => requestAnimationFrame( () => {
      a = [name+'-enter-active',name+'-enter-to'];
      b = [name+'-leave-active', name+'-leave-to'];
      configure();

      if(duration) {
        // explicit duration
        const enter = duration.enter || duration;
        const leave = duration.leave || duration;
        if(enter != leave) {
          // different durations
          setTimeout(() => {
            a = []
            configure();
          }, enter);
          setTimeout(() => {
            b = []
            configure();
          }, leave);
        } else {
          // same for enter and leave
          setTimeout(() => {
            a = []
            b = false
            configure();
          }, duration);
        }
      } else {
        // use events
        eend = () => {
          a = []
          configure();
        }
        lend = () => {
          b = false
          configure();
        }
      }
    }));
  }
}

























const map = new WeakMap();




function nestOnce(container) {
  return map.has(container) ? map.get(container) : (() => {
    const newPart = new NodePart(container.options);
    newPart.appendIntoPart(container);  
    map.set(container, newPart);
    return newPart;
  })();
}

function classList(element) {
  return (element.classList || new ClassList(element));
}

class ClassList {
  constructor(element) {
    this.classes = new Set();
    this.changed = false;
    this.element = element;
    const classList = (element.getAttribute('class') || '').split(/\s+/);
    for (const cls of classList) {
      this.classes.add(cls);
    }
  }
  add(cls) {
    this.classes.add(cls);
    this.changed = true;
  }

  remove(cls) {
    this.classes.delete(cls);
    this.changed = true;
  }

  commit() {
    if (this.changed) {
      let classString = '';
      this.classes.forEach((cls) => classString += cls + ' ');
      this.element.setAttribute('class', classString);
    }
  }
}
    