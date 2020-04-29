Getting Started

```lit-transition``` is available as an npm package.

Grab it via like this

```bash
npm install lit-transition
```

Now, anywhere you swap templates in your render code,
you can animate the transition like this:

```javascript
import {transition} from 'lit-transition';
// this template will change depending on 'cond'
const dynamic = cond ? html`<b>One</b>` : html`<b>Two</b>`;
// when dynamic changes, it will animate automatically
render(html`<b>${transition(dynamic /*, [options] */)}</b>`, ...);
```

> Throughout this guide we will mostly be using LitElement
> Components in examples since they allow for simple reactive rendering
> and storing some state. 
> All techniques, however also apply
> in a plain lit-html rendering setup!
> If you have lit-element and lit-transition installed,
> the examples should work as they are..

## Example
Here is an example of custom element that changes
its template when clicked.
With no options supplied, the `transition` directive will 
use in the default transition (fade).

<script>
import {LitElement, html} from 'lit-element';
import {transition} from 'lit-transition';

export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }

  // swapped template is transitioned automatically
  get swapped() {
    return transition( // <- this is all!
      this.a ? html`<h2>Cool stuff!</h2>` 
             : html`<h2>Click me</h2>`
    );
  }
  
  render() {
    return html`<center @click=${() => this.a = !this.a}>
      ${this.swapped}
    </center>`
  } 
}
</script>

How could this be any easier, right?

Continue with the [basics](/basics) to learn how 
how lit-transition works and what else you can do with it.
