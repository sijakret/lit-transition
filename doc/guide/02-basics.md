Basics

> Currently, we only support CSS-based transitions. We plan, however, on adding
> Javascript/web animation transitions as well.
> The concepts in this document are general and will also apply to Javascript transitions
> once they are implemented

# Transition types

Currently, only transitioning between single elements/components are supported.
As opposed to concepts like [list transitions](https://vuejs.org/v2/guide/transitions.html#List-Transitions), here, only one of the transitioned items is designated for
presentation at any point in time.

This means you can apply the transition directive on anything that returns a
template with one single root node.

```javascript
html`<div>
  ${transition(html`<div>cool stuff</div>`)}
</div>`;
```

This makes it very easy to transition between items in a list for instance:

<script>
import { LitElement, html } from 'lit-element';
import { transition, slide } from 'lit-transition';

// list of renderable templates
const items = [
  'Another', html`<i>one</i>`, 'bites', 'the', html`<b>dust</b>`,
  'Hey,', 'I\'m', 'gonna', 'get', 'you', 'too'
];

export class Comp extends LitElement {
  // this.i is used to cycle through items
  static get properties() { return { i: Number } }

  // helper to set up periodic updates to this.i
  connectedCallback() {
    super.connectedCallback();
    // toggle every second
    this.interval = setInterval(() => this.i = ((this.i||0)+1)%items.length, 1200);
  }
  // cleans up on unmount
  disconnectedCallback(){
    super.disconnectedCallback();
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

> Note: if you transition text nodes as above,
> lit-transition will automatically create a `<div></div>` node 
> under the hood to apply styles to.

# Transition modes

We support three transition modes:

* __`in-out`__:
  will schedule the enter transition for the new content first.
  Once the enter transition has completed,
  the leave transition for the old content is triggered
* __`out-in`__.
  will schedule the leave transition for the current content first.
  Once the leave transition has completed,
  the enter transition for the new content triggered
* __`both`__.
  both enter and leave transition are triggered simulatneously right away

The transition mode can be supplied as part of the [options of a transition](/css-transitions#sec-1)

```javascript
transition(template, { mode: 'in-out' /*, ..more optiond*/ })
```

Take a look at the following example to try out the differences
between the available transition modes:
<script>
import { LitElement, html } from 'lit-element';
import { transition, slide } from 'lit-transition';

export class Comp extends LitElement {
  static get properties() {
    return { 
      a: Boolean, // to toggle content
      mode: String // for transition mode
    }
  }

  // sets mode and swaps transitioned content
  exec(mode) {
    this.mode = mode;
    this.a = !this.a;
  }

  render() {
    // animates with different modes
    return html`click to transition
    <button @click=${() => this.exec('in-out')}>in-out</button>
    <button @click=${() => this.exec('out-in')}>out-in</button>
    <button @click=${() => this.exec('both')}>both</button>
    ${transition(this.a
      ? html`<div>A ${this.mode}</div>`
      : html`<div>B ${this.mode}</div>`,
      slide({x:'200px', mode: this.mode})
    )}`;
  } 
}
</script>

# Marking templates

Transitions are triggered every time a template is rerendered.
This means, that whenever sections unrelated to your transition
trigger a redraw, all transition directives are re-executed as well.

In some scenerios, re-runing these animations might be desired.
To only trigger transitions on content that actually changed,
we need to mark templates so lit-transition can recognized templates
it has already seen and skip animations.

## The issue
Consider the example below.
If you click the 'unrelated' button,
even though the affected part of the template
is not a direct child of the transition directive,
it still triggers a re-reder of the whole template
and thus a transition animation.

<script>
import { LitElement, html, css } from 'lit-element';
import { transition, slide } from 'lit-transition';

export class Comp extends LitElement {
  static get styles() { return css`
    .two {
      background: red;
    }`;
  }
  static get properties() {
    return { 
      a: Boolean, // to toggle content
      u: Boolean // effects unrelated content
    }
  }

  get unrelated() {
    return this.u ? 'A' : 'B';
  }

  render() {
    // changing this.u and in turn this.unrelated
    // will re-trigger the transition
    return html`
    <button @click=${() => this.a = !this.a}>change transitioned content</button>
    <button @click=${() => this.u = !this.u}>change unrelated content (should not transition)</button>
    <div>${transition(this.a
        ? html`<div>${this.unrelated}</div>`
        : html`<div class="two">TWO ${this.unrelated}</div>`
    , slide)}</div>`;
  } 
}
</script>

## The fix
To fix this, we use the `mark` helper to make
lit-transition recognize templates it has already seen.

```javascript
import { transition, mark } from 'lit-transition';
// marked template will be reidentifyable by transition directive
transition(mark(hmtl`<div>MyTemplate</div>`, 'UniqueName'));
```

This way, animations are only executed when the
actual transition content changes.

<script>
import { LitElement, html, css } from 'lit-element';
import { transition, mark, slide } from 'lit-transition';

export class Comp extends LitElement {
  static get styles() { return css`
    .two {
      background: red;
    }`;
  }
  static get properties() {
    return { 
      a: Boolean, // to toggle content
      u: Boolean // effects unrelated content
    }
  }

  get unrelated() {
    return this.u ? 'A' : 'B';
  }

  render() {
    // transition wil only be triggered of the marked content
    // changes
    return html`
    <button @click=${() => this.a = !this.a}>change transitioned content</button>
    <button @click=${() => this.u = !this.u}>change unrelated content (should not transition)</button>
    <div>${transition(
      this.a ? mark(html`<div>ONE ${this.unrelated}</div>`,'one') :
        mark(html`<div class="two">TWO ${this.unrelated}</div>`,'two')
    , slide)}</div>`;
  } 
}
</script>

Once you familiarized yourself with these basic concepts,
continue by learning how to use [css transitions](css-transitions).
