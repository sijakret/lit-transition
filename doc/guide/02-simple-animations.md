Simple Transitions

## Swipe

Basic swipe transition

```js
import {transition, land} from 'lit-transition';

class Demo extends LitElement {
  static get properties() {
    return { a: { type: Number } };
  }

  render() {
    return html`<div @click=${() => this.a = !this.a}>
      ${transition(this.content, land)}
    </div>`;
  }

  get content() {
    return this.a ? html`<div>ONE</div>` : html`<div>TWO</div>`;
  }
}
customElements.define('demo-land', Demo);
```

## Land

This transition is handy for swapping ha page content.
In fact, it is the transition used on this documentation.

```js
import {transition, land} from 'lit-transition';

class Demo extends LitElement {
  static get properties() {
    return { a: { type: Number } };
  }

  render() {
    return html`<div @click=${() => this.a = !this.a}>
      ${transition(this.content, land)}
    </div>`;
  }

  get content() {
    return this.a ? html`<div>ONE</div>` : html`<div>TWO</div>`;
  }
}
customElements.define('demo-land', Demo);
```