
import {NodePart, html} from 'lit-html';
import classList from './class-list';
import {Predefined} from './styles';

const setup = new WeakMap();

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
    let data = setup.get(container);
    let stylePart = undefined;
    let currentPart = undefined;
    let nextPart = undefined;
    if(!data) {
      // init
      stylePart = new NodePart(container.options);
      stylePart.appendIntoPart(container);
      currentPart = new NodePart(container.options);
      currentPart.appendIntoPart(container);
      nextPart = new NodePart(container.options);
      nextPart.appendIntoPart(container);
      const data = {
        currentPart,
        nextPart,
        stylePart
      }
      setup.set(container, data);

      currentPart.setValue(elem);
      currentPart.commit();
    } else {
      stylePart = data.stylePart;

      nextPart = data.nextPart;
      currentPart = data.currentPart;

      // set incomming
      nextPart.setValue(elem);
      nextPart.commit();

      // swap
      data.currentPart = nextPart;
      data.nextPart = currentPart;
    }

    // initial configuration
    // always the same
    let a = [name+'-enter'];
    let b = [name+'-leave'];
    let eend = () => { }
    let lend = () => { }

    // configures classes of support dom
    function configure() {
      stylePart.setValue(css);
      stylePart.commit();

      // container.setValue( html`
      // ${css}
      // ${next}
      // ${b&&prev ? prev: undefined
      // }`
      // );
      // container.commit();
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
