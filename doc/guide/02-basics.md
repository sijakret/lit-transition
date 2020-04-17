Basics

# Transition types

Currently, only transitioning between single elements/components are supported.
Ass opposed to concepts like [list transitions](https://vuejs.org/v2/guide/transitions.html#List-Transitions), here only one of the transitioned items is designated for
presentation at any point in time.

This means you can apply the `transition` directive on anything that returns a
template with one single root node. This includes lists.

<script>
import { LitElement, html,css} from 'lit-element';
import {transition,slide} from 'lit-transition';
const items = [
  'Another', 'one', 'bites', 'the', 'dust',
  'Hey,', 'I\'m', 'gonna', 'get', 'you', 'too'
];

// demo component
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
    clearInterval(this.interval);
  }

  render() {
    // cycle throrough items
    return transition(
      items.map(item => html`<b>${item}</b>`)[this.i],
      slide({x:'400%'})
    )
  } 
}
</script>

# Marking templates



# Layout Reflow


# Javascript hooks

TODO

