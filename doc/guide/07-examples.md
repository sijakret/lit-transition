More Examples

Let's go to town and actually use lit-transition for some cool stuff.

# Simple slideshow

With lit-transition it is very easy to create a slide-show component with a few lines.
have a look at the comments in the code (probably 80% of it is unrelated logic, and styling)

<script>
import { LitElement, html, css } from 'lit-element';
import { transition, TransitionMode, slide } from 'lit-transition';

const anim = slide({
  mode: TransitionMode.Both,
  opacity: 1,
  leave: {
    lock: true
  },
  x:'100%',  // slide out to right ..
  x1:'-100%' // .. and in from left
});

// slideshow component
export class Comp extends LitElement {
  static get properties() {
    return { 
      slide: Number,
      slides: Object
    }
  }
  static get styles() {
    return css`
    :host {
      position: relative;
      display: block;
      height: 300px;
      overflow: hidden;
    }
    [a],[b] {
      z-index: 1;
      position: absolute;
      top: 50%;
    }
    [a] {
      left: 5%;
    }
    [b] {
      right: 5%;
    }
    img {
      max-height: 100%;
      max-width: 100%;
    }
    `;
  }
  constructor() {
    super();
    this.slide = 0;
    this.init();
  }
  
  // get some cool images
  async init() {
    const slides = (await Promise.all(Array(10).fill(0)
      .map(() => fetch('https://source.unsplash.com/800x500/?beach'))))
      .map(({url})  => html`<img src=${url} >`);
    this.slides = slides;
  }

  render() {
    return !!this.slides ? this.slideshow : html`<span>Loading...</span>`;
  }

  skip(n = 1) {
    this.slide = (this.slide + n) % this.slides.length;
  }

  get slideshow() {
    // slide to show
    return html`
    <button a @click=${() => this.skip(-1)}>prev</button>
    <button b @click=${() => this.skip()}>next</button>
    ${transition(this.slides[this.slide], anim)}`;
  }
}
</script>

# Use with lit-element-router

# Use with animated.css