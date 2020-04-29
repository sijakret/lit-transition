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
// available options
transition(html`..transition me..`, {

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
  // default: undefined
  duration: 1000 //ms

  // override the classes assigned during enter transitions
  // if set to 'false' no enter transition is performed
  // default: as indicated below
  enter: {
    active: 'enter-active',
    from: 'enter-from',
    to: 'enter-to',

    // only applies to enter transition
    // falls back to base duration
    // default: undefined
    duration: 2000, 

    // if true, additional styles
    // will be applied that will freeze the current geometry
    // present before animation start
    // check out the 'Layout reflows' section below
    lock: false
  },

  // override the classes assigned during enter transitions
  // if set to 'false' no enter transition is performed
  // default: as indicated below
  leave: {
    active: 'leave-active',
    from: 'leave-from',
    to: 'leave-to',

    // only applies to enter transition
    // falls back to base duration
    // default: undefined
    duration: 2000, 

    // leave transitions use the lock feature for
    // conditionally by default
    // check out the 'Layout reflows' section below
    lock: mode !== TransitionMode.Both
  },

  // hook called right before enter transition starts
  onEnter: () => {},

  // hook called after enter transition completed
  onAfterEnter: () => {},

  // hook called right before leave transition starts
  onLeave: () => {},

  // hook called after leave transition completed
  onAfterLeave: () => {},

  // see transition Basics -> transition mode
  // * TransitionMode.InOut = 'in-out'
  // * TransitionMode.OutIn = 'out-in'
  // * TransitionMode.Both = 'both'
  // default: TransitionMode.Both
  mode: TransitionMode.Both 
})
```
# Simple CSS transition

Let's create our first custom transition.
We will call it `spin3D` and, we want it to
rotate out old content and spin in new content
so everyone get's dizzy.

Let's first create the css classes we need for our enter transition:
```css
.enter-active
```
<script>
import {LitElement, html, css} from 'lit-element';
import {transition} from 'lit-transition';

const spin = {
  mode: 'out-in',
  css: `
    .enter-active, .leave-active {
      transition: all 0.4s linear;
    }
    .enter-from {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(1, 0, 0.5, 3.142rad) scale(2);
    }
    .enter-to, .leave-from {
      opacity: 1;
      filter: blur(0px);
      transform: rotate3d(1, 0, 0.5, 0rad);
    }
    .leave-to {
      opacity: 0.1;
      filter: blur(2px);
      transform: rotate3d(1, 0, 0.5, -3.142rad) scale(2);
    }`,
  /*enter: {
    active: 'spin',
    from: 'spin-start',
    to: 'spin-show',
  },
  leave: {
    active: 'spin',
    from: 'spin-show',
    to: 'spin-leave',
  }*/
}
export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }

  // swapped template is transitioned automatically
  get crazy() {
    return transition( // <- this is all!
      this.a ? html`<h2>DIZZZZY!</h2>` 
             : html`<h2>Click me</h2>`,
      spin);
  }
  
  render() {
    return html`<center @click=${() => this.a = !this.a}>
      ${this.crazy}
    </center>`
  } 
}
</script>

> It is important your css classes actually execute
> a transition since lit-transition uses 'ontransitionend' 
> and 'onanimationend' events to determine if your animation
> has finished and the next transition can be scheduled.
> If your animations never start or finish, this mechanism breaks.
> You can specify a fixed duration using the `duration` field in ei

# Advanced CSS transition
<script>
import {LitElement, html, css} from 'lit-element';
import {transition} from 'lit-transition';

const spin = {
  mode: 'out-in',
  css: `
    .enter-active, .leave-active {
      transition: all 0.4s linear;
    }
    .enter-from {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(1, 0, 0.5, 3.142rad) scale(2);
    }
    .enter-to, .leave-from {
      opacity: 1;
      filter: blur(0px);
      transform: rotate3d(1, 0, 0.5, 0rad);
    }
    .leave-to {
      opacity: 0.1;
      filter: blur(2px);
      transform: rotate3d(1, 0, 0.5, -3.142rad) scale(2);
    }`,
  /*enter: {
    active: 'spin',
    from: 'spin-start',
    to: 'spin-show',
  },
  leave: {
    active: 'spin',
    from: 'spin-show',
    to: 'spin-leave',
  }*/
}
export class Comp extends LitElement {
  // a prop that we toggle and what will trigger redraw
  static get properties() { return { a: Boolean } }

  // swapped template is transitioned automatically
  get crazy() {
    return transition( // <- this is all!
      this.a ? html`<h2>DIZZZZY!</h2>` 
             : html`<h2>Click me</h2>`,
      spin);
  }
  
  render() {
    return html`<center @click=${() => this.a = !this.a}>
      ${this.crazy}
    </center>`
  } 
}
</script>

# Caveat: Layout reflows

# Predefined transitions
