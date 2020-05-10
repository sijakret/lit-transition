CSS Transitions

# Transition classes

css transitions are simple.
When a transition is executed, css classes are applied and removed
to the entering or leaving DOM nodes in a particular sequence.
The default names of these classes are as follows
(respectively for enter and leave transitions):

* __`[enter/leave]-active`__:
  Added at the very begining, stays active throughout the whole transition.
  Use this class to define transition and animation times, easing, etc..
  Removed after transition has finished.
* __`[enter/leave]-from`__:
  Added at the very begining, and removed right after the first frame.
  This class should describe the initial state of the css properties to animate
  at the start of your animation.
* __`[enter/leave]-to`__:
  Added after first frame, right when `[enter/leave]-from` is removed.
  This class should describe the eventual target state of css properties.
  Removed after transition has finished.

The diagram below illustrates at what time which css classes are applied in case of an enter transition

<center>
<br>
<img src="assets/state-diagram.svg">
<br>
</center>

# Transition options

You can change the default class names that are applied
at the respective stages by supplying customized names in
the transition options.

On top of that, the following options
can be passed as the second argument to the transition directive:

```javascript
// all options are optional and have sane defaults!
transition(html`..transition me..`, {
  // see transition Basics -> transition mode
  // * TransitionMode.InOut = 'in-out'
  // * TransitionMode.OutIn = 'out-in'
  // * TransitionMode.Both = 'both'
  // default: TransitionMode.Both
  mode: TransitionMode.Both ,

  // css that will be injected in a style tag
  // alongside the animated templates
  // it preferable and more performant to just have classes
  // already present in your app so they will be simply assigned
  // if you set this, style tags will be inserted automatically
  // default: undefined
  css: `.enter-active { /* .. */ }`,

  // in case your css transitions have inconsistent
  // durations (some finish earlier than others)
  // we won't be able to automaticically know when it
  // finished so you need to specify the duration explicitly
  // applies to enter and leave transition
  // default: 500ms
  duration: 1000 //ms

  // if true, animations will be bypassed during while
  // pages are not shown, the intent is to save computations
  // js hooks will still be executed.
  // default: true
  skipHidden: true

  // if set to 'false' no enter transition is performed
  // default: as indicated below
  enter: {
    // override classes assigned during enter transitions
    active: 'enter-active',
    from: 'enter-from',
    to: 'enter-to',

    // only applies to enter transition
    // falls back to base duration
    // default: undefined
    duration: Number (ms), 

    // if true, additional styles
    // will be applied that will freeze the current geometry
    // present before animation starts
    // check out the 'Layout reflows' section below
    // options:
    //  GeometryLockMode.None = 0 | false
    //  GeometryLockMode.Lock = 1 | true
    //  GeometryLockMode.Auto = 'auto'
    lock: GeometryLockMode.None
  },

  // if set to 'false' no enter transition is performed
  // default: as indicated below
  leave: {
    // override classes assigned during enter transitions
    active: 'leave-active',
    from: 'leave-from',
    to: 'leave-to',

    // only applies to enter transition
    // falls back to base duration
    // default: undefined
    duration: Number (ms),
    
    // if true, additional styles
    // will be applied that will freeze the current geometry
    // present before animation starts
    // check out the 'Layout reflows' section below
    // options:
    //  GeometryLockMode.None = 0 | false
    //  GeometryLockMode.Lock = 1 | true
    //  GeometryLockMode.Auto = 'auto'
    lock: GeometryLockMode.None
  },

  // hook called right before enter transition starts
  onEnter: () => {},

  // hook called after enter transition completed
  onAfterEnter: () => {},

  // hook called right before leave transition starts
  onLeave: () => {},

  // hook called after leave transition completed
  onAfterLeave: () => {}
})
```
# Simple CSS transition

Let's create our first custom transition.
We will call it `spin3D` and, we want it to
rotate out old content and spin in new content
so everyone get's dizzy.

Let's first create the css classes we need for our enter transition:
```css
/*
 * let's be lazy and just transition all
 * css props. a more clean solution is to
 * only transition the needed props!
 */
.enter-active, .leave-active {
  transition: all 0.2s linear;
}

/*
 * when a new template enters, it starts
 * with these props, so it will be very transparent
 * a bit blurry and rotated 180degres away
 */
.enter-from {
  opacity: 0.1;
  filter: blur(1px);
  transform: rotate3d(1, 0, 0.5, 180deg) scale(2);
}

/*
 * after entering, and befor leaving
 * we just set all transitioned properties to iniial
 */
.enter-to, .leave-from {
  opacity: initial;
  filter: initial;
  transform: initial;
}

/*
 * pretty much the same as .enter-from
 * the main difference is the rotation angle
 * so the rotation looks continuous and does not bounce
 */
.leave-to {
  opacity: 0.1;
  filter: blur(2px);
  transform: rotate3d(1, 0, 0.5, -180deg) scale(2);
}
```

That's pretty much it, if we also specify `in-out` mode we have
a neat rotating transition ready to be used with lit-transition.

Putting everything together:

<script>
import {LitElement, html, css} from 'lit-element';
import {transition} from 'lit-transition';

const spin3D = {
  mode: 'out-in',
  css: `
    .enter-active, .leave-active {
      transition: all 0.2s linear;
    }
    .enter-from {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(1, 0, 0.5, 180deg) scale(2);
    }
    .enter-to, .leave-from {
      opacity: initial;
      filter: initial;
      transform: initial;
    }
    .leave-to {
      opacity: 0.1;
      filter: blur(2px);
      transform: rotate3d(1, 0, 0.5, -180deg) scale(2);
    }`
}
export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }

  // swapped template is transitioned automatically
  get crazy() {
    return transition( // <- this is all!
      this.a ? html`<h2>DIZZZZY!</h2>` 
             : html`<h2>Click me</h2>`,
      spin3D);
  }
  
  render() {
    return html`<center @click=${() => this.a = !this.a}>
      ${this.crazy}
    </center>`
  } 
}
</script>


# Advanced CSS transition

In the last example we inject the css directly.
If we can make it available in the transition context
this is not necessary.

This what we did in the example below.
We also renamed the classes of `spin3D` merging some classes
for the different states of enter and leave.
In addition, we added some easing 
and went a bit more out there with what the animation does :)
<script>
import {LitElement, html, css} from 'lit-element';
import {transition} from 'lit-transition';

const spin3D = {
  mode: 'out-in',
  enter: {
    active: 'spin', 
    from: 'spin-enter',
    to: 'spin-show',
  },
  leave: {
    active: 'spin', // same class as active phase of enter
    from: 'spin-show', // .. this one too!
    to: 'spin-leave',
  }
}
export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }
  static get styles() {
    return css`
    .spin {
      transition: all 0.3s ease-in;
    }
    .spin-enter {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(0, 1, 0, 360deg) scale(4);
    }
    .spin-show {
      opacity: initial;
      filter: initial;
      transform: initial;
    }
    .spin-leave {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(0, 1, 0, -360deg) scale(4);
    }`
  }

  // swapped template is transitioned automatically
  get crazy() {
    return transition( // <- this is all!
      this.a ? html`<h2>DIZZZZY!</h2>` 
             : html`<h2>Click me</h2>`,
      spin3D);
  }
  
  render() {
    return html`<center @click=${() => this.a = !this.a}>
      ${this.crazy}
    </center>`
  } 
}
</script>

It is typically preferable to move your transition
css with your other app css so it does not clutter your
code.
Moreover, performanc is better since
the classes are only created once and simply applied during
transition phases.

> It is important your css classes actually execute
> a transition since lit-transition uses 'ontransitionend' 
> and 'onanimationend' events to determine if your animation
> has finished so the next transition can be scheduled.
> If your animations never start or finish, this mechanism breaks.
> You can specify a fixed duration using the `duration` field in
> the transition optins to nail it down in case of problems.

> If you see elements piling up in your document
> it likely means your transitions are not finishing!

# CSS Animations

css animations can be used pretty much the analogously.
Since typically keyframes are used to define web animations,
no `from` and `to` phases are are required.

If you assign a string or an array to the `enter` and `leave` fields
of the transition options, the respective class names
are used during the the `active` phase.

<script>
import {LitElement, html, css} from 'lit-element';
import {transition} from 'lit-transition';

const swirl = {
  mode: 'out-in',
  enter: 'swirl-enter',
  leave: ['swirl-leave', /* more if needed */ ]
}

export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }
  static get styles() {
    return css`
    .swirl-enter {
      animation: swirl .35s;
    }
    .swirl-leave {
      animation: swirl .35s reverse;
    }
    @keyframes swirl {
      0% {
        transform: scale(3.0) rotate(600deg);
        filter: blur(3px);
        opacity: 0;
      }
      100% {
        transform: scale(1);
      }
    }`
  }

  render() {
    return html`<center @click=${() => this.a = !this.a}>${
      transition( 
        this.a ? html`<h2>WROOHM!</h2>` 
             : html`<h2>Click me</h2>`,
        swirl)
      }</center>`;
  } 
}
</script>

# Layout reflows

At some point during transitions the leaving template is removed
and the entering template is added.

If any of these items is part of the flow of the document (i.e. has `position: relative` and not `absolute` or `fixed`) this operation will lead to a reflow of
your app.
Typically transitions have a certain point in time where the leacing template gets taken
out of the flow and the entering one gets added.
Similarly, the css `display` property has a huge effect on how a DOM node
is nested in the flow.

> If you use `display: block`, a node will fill the whole line.
> If you remove it from the flow by setting `position: fixed|absolute`
> the extends of the object may change drastically.
> If this is not desired, try `display: inline-block` to make the
> DOM Node keep more of its geometry!


If the `active` phase of your leave transition sets the position to `absolute` (or `fixed`),
that element get's taken out of the flow the second its leave transition is started.
In case of transition mode `TransitionMode.Both (==='both')` this might be fine since the entering element will be added right at that same time anyways.
In case of `'out-in'` mode, however, the template would be taken out of the flow, and the re-calculated layout would probably collapse a bit taking up the empty space.
So here, you likely want to keep elements in the flow of the document as long as they live.

### GeometryLockMode

If you want to take the leaving template out of the flow by setting its
position to `absolute`.
The item might snap to a different location depending other css properties
like margins etc.
To help with this, we have a `lock` helper described in the transition options.

```javascript
transition(template, { 
  leave: {
    /*..*/,
    lock: true
  }
})
```
and set the position to `absolute` in your `leave-active` state.
The geometry of the node right before applying the leave transition will be recorded
and locked so you can for instance easily apply `transform: translate(..)` css
without having to worry about positioning much.

> Note: you will likely want to set the position of you parent element to `relative`
> when using transitions with absolute positioning!

If you are not sure or are having problems, try 'auto' mode. 
```javascript
transition(template, { 
  leave: {
    /*..*/,
    lock: GeomtryLockMode.Auto (=='auto')
  }
})
```
It will try to detect if you are applying absolute positioning during the `-active`
phase of your animation and are located in a container with `relative`positioning.
In that case geometry will be locked for you!

> __Tip__: if you have problems with animations, try grabbing an existing
> working one that is close to what you want and tweak it.


# Built-in transitions

We have a set of predefined css-based transitions ready for use.
These transitions have a set of custom options and try
to derive some transition css in a context-aware way.

They also forward all standard options (like `mode`, `duration`)
to the underlying system:

<script>
import { LitElement, html } from 'lit-element';
import {
  transition,
  slide,
  fade,
  land
} from 'lit-transition';

// our built-in animations
const builtins = {slide,fade,land};

export class Comp extends LitElement {
  static get properties() {
    return { 
      a: Boolean, // to toggle content
      choice: Object // for transition mode
    }
  }
  // initialize component
  constructor() {
    super();
    this.choice = slide;
  }

  // sets mode and swaps transitioned content
  select(e) {
    this.choice = builtins[e.target.value];
    this.a = !this.a;
  }

  render() {
    // animates with different modes
    return html`click to transition
    <select @change=${this.select}>${
      Object.values(builtins).map(b => html`<option value=${b.name}>${b.name}</option>`)
    }</select>
    <button @click=${() => this.a = !this.a}>animate</button>
    <div style="margin: 20px; font-size: 30px">
    ${transition(
      this.a ? 'CONTENT A' : 'CONTENT B',
      this.choice
    )}</div>`;
  } 
}
</script>

> Note: some of the built-in transitions manipulate positions, and by default they
> assume 

### Options

The following options are available for our built-in transitions

```javascript
interface CSSTransitionOptions {
  // css string or template
  css?: TemplateResult|string|null = null
  // duration in ms
  duration?: number = 500
  // enter classes {active,from,to}
  enter?: CSSClassSequence|Boolean = undefined
  // leave classes {active,from,to}
  leave?: CSSClassSequence|Boolean = undefined
  // enter classes {'in-out','out-in', 'both'}
  mode?: TransitionMode = 'both'
  // dont animate while document.hidden === true
  skipHidden?: Boolean = true
  // callbacks
  onEnter?: Function = undefined
  onLeave?: Function = undefined
  onAfterEnter?: Function = undefined
  onAfterLeave?: Function = undefined
}

interface CSSFadeOptions extends CSSTransitionOptions  {
  // css easing options (default: ease-out)
  ease?: string,
  // opactiy to fade from and to (default: 0)
  opacity?: number
}

interface CSSSlideOptions extends CSSTransitionOptions  {
  // easing options (default: ease-out)
  ease?: string
  // opacity at start of animation (default: 0)
  opacity?: number
  // force positioning (default: undefined)
  leavePosition?: string
  // slide to left (default: false)
  left?:Boolean
  // slide to right (default: false)
  right?:Boolean
  // slide to up (default: false)
  up?:Boolean
  // slide to down (default: false)
  down?:Boolean
  // slide out target x (default: 100%)
  x?: string
  // slide out target y (default: 0%)
  y?: string
  // slide in start x (default: same as x)
  x1?: string
  // slide in start y (default: same as y)
  y1?: string

  // additional options will be added to
  // to the TransitionOptions passed to the directive
}

interface CSSLandOptions extends CSSTransitionOptions  {
  // css easing options (default: ease-out)
  ease?: string,
  // opacity to fade from and to (default: 0)
  opacity?: number
}


```
