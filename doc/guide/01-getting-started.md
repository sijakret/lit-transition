Getting Started

```lit-transition``` is available as an npm package.

Grab it via like this

```bash
npm install lit-transition
```

Now, anywhere in your lit-html templates you can animate thinks like this
<style>
button {
  font-size: 20px;
}
</style>
<script>
import {transition} from 'lit-transition';

class Comp extends LitElement {
  static get properties() {
    return {
      one: Boolean
    }
  }

  render() {
    const template = this.one ? html`<div>One</div>` : html`<span>Two</span>`;
    return html`<div @click=${() => this.one = !this.one}>
      ${transition(template, window.transPage)}
    </div>`
  } 
}
</script>

