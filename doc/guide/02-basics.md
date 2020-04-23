Basics

# Transition types

Currently, only transitioning between single elements/components are supported.
In contrast to concepts like [list transitions](https://vuejs.org/v2/guide/transitions.html#List-Transitions), here only one of the transitioned items is designated for
presentation at any point in time.

This means you can apply the `transition` directive on anything that returns a
template with one single root node. This includes lists.

<script>
import { LitElement, html,css} from 'lit-element';
import {transition,slide} from 'lit-transition';
const items = [
  'Another', html`<i>one</i>`, 'bites', 'the', html`<h3>dust</h3>`,
  'Hey,', 'I\'m', 'gonna', 'get', 'you', 'too'
];

export class Comp extends LitElement {
  // i cycles through items
  static get properties() { return { i: Number } }

  connectedCallback() {
    super.connectedCallback();
    // toggle every second
    this.interval = setInterval(() => this.i = ((this.i||0)+1)%items.length, 1200);
  }
  disconnectedCallback(){
    super.disconnectedCallback();
    // clean up
    clearInterval(this.interval);
  }

  render() {
    // cycle through items
    return transition(
      items.map(item => html`<b>${item}</b>`)[this.i],
      slide({x:'300px'})
    )
  } 
}
</script>


# State diagram


<img src="assets/state-diagram.svg">

# Marking templates


# Layout reflows


# Javascript hooks

TODO

