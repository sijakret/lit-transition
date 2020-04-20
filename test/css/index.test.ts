
import {html} from 'lit-element';
import {transition} from 'lit-transition'
import {compTest,TestComponent} from '../utils/comp';

suite('Sanity', function() {
  compTest(class Comp extends TestComponent {
    render() {
      return transition(html`<div>HI</div>`);
    }
    updated() {
      this.resolve();
    }
  })
})