Getting Started

```lit-transition``` is available as an npm package.

Grab it via like this

```bash
npm install lit-transition
```

Now, anywhere in your lit-html templates you can animate thinks like this:

```javascript
import {transition} from 'lit-transition';

const template = html`
  <div>${
    transition(cond ? html`<b>One</b>` : html`<b>Two</b>`)
  }</div>`;
```

# Example
Here is an example of custom element that changes
its template on clicks and uses the `transition` 
directive to animate that with the defaullt transition (fade).

<script>
import {LitElement, html} from 'lit-element';
import {transition} from 'lit-transition';

export class Comp extends LitElement {
  // just a prop that will be toggled
  static get properties() { return { a: Boolean } }

  // swapped template is transitioned automatically
  get swapped() {
    return transition(
      this.a ? html`<h2>Cool stuff!</h2>` : html`<h2>Click me</h2>`
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