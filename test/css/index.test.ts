import { html } from 'lit-element';
import { assert} from 'chai';

import { transition } from 'lit-transition';
import { compTest, TestComponent } from '../utils/comp';
import { fade, land, slide } from '../../src/css/transitions';
import { setForceClassList } from '../../src/core/class-list';
import { TransitionMode } from '../../src/css/interfaces';

const modes = [
  TransitionMode.InOut,
  TransitionMode.OutIn,
  TransitionMode.Both
];

const transitions = [
  fade,
  land,
  slide
];

modes.forEach(mode => {
  // basic sanity tests for all stock transitions
  suite(`mode: '${mode}' transition tests`, function() {
    // execute for all stock transitions
    transitions.forEach((type:Function) => {
      // test basic strates for transition
      compTest(`enter -> leave ${type.name}`,
        generate({type, mode}));
      // will use class list polyfill apparently needed by IE11
      compTest(`enter -> leave ${type.name} (polyfill)`,
        generate({type, mode, usePolyfill:true}));
    })
  })
})

function generate({
    type,
    usePolyfill = false,
    mode = TransitionMode.InOut,
  } : {
    type: Function,
    usePolyfill?: Boolean,
    mode?: TransitionMode
  }) {
  const seq:string[] = [];
  class Comp extends TestComponent {
    static get properties() {
      return {
        toggle: {
          type: Boolean
        }
      }
    }

    constructor(){
      super();
      setForceClassList(usePolyfill);
    }
    
    render() {
      return transition(
        // @ts-ignore
        this.toggle ? html`<div id="B">B</div>` : html`<div id="A">A</div>`,
        type({
          onAfterEnter: this.enter.bind(this),
          onAfterLeave: this.leave.bind(this),
          mode
        })
      );
    }

    // after-entering assertions
    enter() {
      // check is important so we toggle only once!
      // @ts-ignore
      if(!this.toggle) {
        const dom = this.dom('div');
        // @ts-ignore
        const expected = this.toggle ? 'B' : 'A';
        // our component and it's contents must be in dom
        assert(dom.innerText === expected,
          'content not rendered after enter');
        assert(dom.id === expected,
          'content not rendered after enter');
        seq.push('enter '+dom.innerText);
        // @ts-ignore
        this.toggle = !this.toggle;
      }
    }

    // after leave
    leave() {
      const dom = this.dom('div');
      if(mode === TransitionMode.OutIn) {
        // in OutIn mode, at this point, the old
        // node has transitioned out, so the dom should be empty
        assert(!dom, 'content not not empty after leave');
        seq.push('leave null');
      } else {
        // in other modes, the new node should already be present
        seq.push('leave '+dom.innerText);
        assert(dom.innerText === 'B', 'content not rendered after leave');
      }
      this.resolve(seq);
    }
  }
  return Comp;
}
