
import {html} from 'lit-element';
import {transition} from 'lit-transition'
import {compTest,TestComponent} from '../utils/comp';

import { assert } from 'chai';
import {fade,land,slide} from '../../src/css/transitions';
import {setForceClassList} from '../../src/css/class-list';
import {TransitionMode} from '../../src/css/base'

  
[/*TransitionMode.InOut,*/TransitionMode.OutIn].forEach(mode => {
  // basic sanity tests for all stock transitions
  suite(`${mode} mode transition auto tests`, function() {
    // execute for all stock transitions
    [fade,land,slide].forEach((type:Function) => {
      // test basic strates for transition
      compTest(`appear -> enter -> leave ${type.name}`,
        generate({type, mode}));
      // will use class list polyfill apparently needed by IE11
      compTest(`appear -> enter -> leave ${type.name}`,
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
        this.toggle ? html`<div id="B">B</div>` : html`<div id="A">A</div>`,
        type({
          onEnter: this.enter.bind(this),
          onLeave: this.leave.bind(this),
          mode
        })
      );
    }

    // after-entering assertions
    enter() {
      const dom = this.dom('div');
      const expected = this.toggle ? 'B' : 'A';
      // our component and it's contents must be in dom
      assert(dom.innerText === expected,
        'content not rendered after enter');
      assert(dom.id === expected,
        'content not rendered after enter');
      seq.push('enter '+dom.innerText);
      this.toggle = !this.toggle;
    }

    // after leave
    leave() {
      const dom = this.dom('div');
      seq.push('leave '+dom.innerText);
      assert(dom.innerText === 'B', 'content not rendered after leave');
      this.resolve(seq);
    }
  }
  return Comp;
}
