
import {html} from 'lit-element';
import {transition} from 'lit-transition'
import {compTest,TestComponent} from '../utils/comp';
import { assert } from 'chai';
import {fade,land,slide} from '../../src/css/transitions';

// basic sanity tests for all stock transitions
suite('transition auto tests', function() {
  // execute for all stock transitions
  [fade,land,slide].forEach(t => {
    compTest(`-> enter -> leave ${t.name}`, generate(t));
  })
  
})


function generate(type:Function) {
  const seq:string[] = [];
  class Comp extends TestComponent {
   static get properties() {
     return {
       toggle: {
         type: Boolean
       }
     }
   }
    
    render() {
      return transition(
        this.toggle ? html`<div>B</div>` : html`<div>A</div>`,
        type({
          onEnter: this.enter.bind(this),
          onLeave: this.leave.bind(this)
        })
      );
    }
    enter() {
      const dom = this.dom('div');
      const expected = this.toggle ? 'B' : 'A';
      assert(dom.innerText === expected,
        'content not rendered after enter');
      seq.push('enter '+dom.innerText);
      this.toggle = !this.toggle;
    }
    leave() {
      const dom = this.dom('div');
      seq.push('leave '+dom.innerText);
      assert(dom.innerText === 'B', 'content not rendered after leave');
      this.resolve(seq);
    }
  }
  return Comp;
}
