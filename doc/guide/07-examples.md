More Examples

Let's go to town and actually use lit-transition for some cool stuff.

# Simple slideshow

With lit-transition it is very easy to create a slide-show component with a few lines.
have a look at the comments in the code (probably 80% of it is unrelated logic, and styling)

<script>
import { LitElement, html, css } from 'lit-element';
import { transition, TransitionMode, slide } from 'lit-transition';

// helper that uses unsplash to get a list of <img> templates
async function getImages(topics) {
  // brutal image preloader
  const prel = (url) => !(new Image().src = url)||url;
  const base = 'https://source.unsplash.com/800x500/?';
  const slides = await Promise.all(topics.map(t => fetch(base+t)))
    // slides is a list of image urls
  return slides.map(({url}) => html`<img src=${prel(url)}>`);
}

// our base animation configuration
const anim = {
  mode: TransitionMode.Both, // transition enter+leave concurrently
  opacity: 0.0, // fade in as well
  leave: { lock: true }
  // left, right <- these will be set dynamically
};

// slideshow component
export class Comp extends LitElement {
  static get properties() {
    return { 
      slides: Object, // list of slides
      slide: Number   // current slide
    }
  }
  static get styles() {
    // some styling, you don't really need this
    // remove it and the slideshow will work but look more ugly
    return css`
    :host {
      position: relative;
      display: flex;
      height: 200px;
      overflow: hidden;
      border: 1px solid;
    }
    div {
      margin: auto;
    }
    [l],[r] {
      z-index: 1;
      position: absolute;
      top: 50%;
    }
    [l] {
      left: 5%;
    }
    [r] {
      right: 5%;
    }
    img {
      margin: auto;
      max-height: 100%;
      max-width: 100%;
    }
    `;
  }
  constructor() {
    super();
    this.slide = 0;
    // get some cool images
    (async () => {
      // this.slides is also used know if we initialized
      this.slides = await getImages(
        [ 'house', 'beach', 'cat', 'dog', 'funny' ]
      );
    })();
  }

  skip(n = 1) {
    anim.left = !!(n > 0)  // configure to slide left depending on n
    anim.right = !!(n < 0) // configure to slide rigt depending on n
    const num = this.slides.length; // we wrap here
    this.slide = (this.slide + n + num) % num;
  }

  // show loading until we are ready
  render() {
    return !!this.slides ? this.slideshow : html`<div>Loading...</div>`;
  }

  get slideshow() {
    // slideshow tremplate
    return html`
    <button l @click=${() => this.skip(-1)}>prev</button>
    <button r @click=${() => this.skip(1)}>next</button>
    ${transition(this.slides[this.slide], slide(anim))}`;
  }
}
</script>

# Use with lit-element-router

# Use with animate.css

[animate.css](https://daneden.github.io/animate.css/) is a neat collection
of css animations.
It is ridiculously easy to combine it with the lit-transition directive.
In fact, We use animate.css on many of the tansitions in this documentation.

For this, make sure animate.css is available where your transitions are used.

```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
    rel="stylesheet" type="text/css">
</head>
```

After this, it is enough set the `enter` and `leave` options
in our transition.
You need to add 'animated' class and whatever transition class you
want to use.
In the example below, we add another class 'absolute' for the leave transition
since we set the transition mode to `Transition.Both` so the entering conent
will immediately take the space of the leaving content in the flow when transitioning.

> Settinng only `enter: ..` or `leave: ..` is equivalent to setting `enter: { active: .. }`
> or `leave: { active: .. }`.
> Using an array, as we do below, will simply apply multiple classes.

<script>
import { LitElement, html, css } from 'lit-element';
import { transition } from 'lit-transition';

// all rotating entrances available in animate.css
// will be prefixed with 'rotateIn' or 'rotateOut'
const classes = ['','DownLeft','DownRight','UpLeft','UpRight'];

export class Comp extends LitElement {
  static get properties() {
    return { 
      a: Boolean, // to toggle content / trigger anim
      choice: Object // for transition mode
    }
  }
  static get styles() {
    return css`.absolute { position: absolute }`;
  }
  
  // initialize component
  constructor() {
    super();
    this.choice = classes[0];
  }

  // sets mode and swaps transitioned content
  select(e) {
    this.choice = e.target.value;
    this.a = !this.a;
  }

  render() {
    // animates with different modes
    return html`
    <!-- get latest animate.css v3.5.1 -->
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
    rel="stylesheet" type="text/css">
    click to transition
    <select @change=${this.select}>${
      Object.values(classes).map(c =>
        html`<option value=${c}>rotate[In/Out]${c}</option>`)
    }</select>
    <button @click=${() => this.a = !this.a}>animate</button>
    <center style="margin: 20px; font-size: 30px; position: relative">
    ${transition(
      this.a ? 'LIT-TRANSITION' : 'ANIMATE.CSSmmmmmm', {
        mode: 'both',
        enter: ['animated', 'rotateIn'+this.choice],
        leave: {
          active: ['animated', 'rotateOut'+this.choice, 'absolute'],
          lock: true
        }
      }
    )}</center>`;
  } 
}
</script>
