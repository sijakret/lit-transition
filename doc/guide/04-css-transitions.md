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

# Caveat: Layout reflows

At some point during transitions the leaving template is removed
and the entering template is added.

If any of these items is part of the flow of the document (i.e. has `position: relative` and not `absolute` or `fixed`) this operation will lead to a reflow of
your app.
Typically transitions have a certain point in time where the leacing template gets taken
out of the flow and the entering one gets added.
Similarly, the css `display` property has a huge effect on how a DOM node
is nested in the flow.

> If you use `display: block`, a node will fill the whole line.
> If you remove it from the flow by setting `postion: relatve|absolute`
> the extends of the object may change drastically.
> If this is not desired, try `display: inline-block` to make the
> DOM Node keep more of its geometry!

For example, if the `active` phase of your leave transition sets the position to `fixed`, that element get's taken out of the flow the second its leave transition is started.
In case of transition mode `'both'` this might be fine since the entering element will be added right at that same time anyways.
In case of `'out-in'` mode, however, the template would be taken out of the flow, and the reacalculated layout would probably collapse a bit taking up the empty space.

Also, if you want your elements to overlay during animations, we have a `lock` helper described in the transition options.

> __Tip__: if you have problems with animations, try grabing an existing
> working one that is close to what you want and tweak it.


# Predefined transitions
TODO
