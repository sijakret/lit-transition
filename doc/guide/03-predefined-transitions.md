Predefined Transitions

## Swipe

Basic swipe transition

```js

class Demo extends LitElement {
  static get properties() {
    return { a: { type: Number } };
  }

  render() {
    return html`<div @click=${(e) => {e.preventDefault(); this.a = !this.a}}>
      ${transition(this.content, transTitle)}
    </div>`;
  }

  get content() {
    return this.a ? html`<div>CONTENT ONE</div>` : html`<div> CONTENT TWO</div>`;
  }
}
customElements.define('demo-land', Demo);
```

## Land

This transition is handy for swapping ha page content.
In fact, it is the transition used on this documentation.

```js
class Demo extends LitElement {
  static get properties() {
    return { a: { type: Number } };
  }

  render() {
    return html`<div @click=${(e) => {e.preventDefault(); this.a = !this.a}}>
      ${transition(this.content, transTitle)}
    </div>`;
  }

  get content() {
    return this.a ? html`<div>CONTENT ONE</div>` : html`<div> CONTENT TWO</div>`;
  }
}
customElements.define('demo-land', Demo);
```