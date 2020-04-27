CSS Transitions

# Transition classes

css transitions are simple.
When a transition is executed, css classes are applied and removed
to the entering or leaving dom templates in a particular sequence.

* __`[enter/leave]-active`__:
  Added at the very begining, stays active throughout the whole transition.
  Use this class to define transition and animation times, easing, etc..
  Removed after transition has finished.
* __`[enter/leave]-from`__:
  Added at the very begining, and removed after the first frame.
  This class should describe the initial state of the css properties to animate.
* __`[enter/leave]-to`__:
  Added after first frame, right when `[enter/leave]-from` is removed.
  Removed after transition has finished.

The diagram below illustrates at what time which css classes are applied in case of an enter transition

<center>
<br>
<img src="assets/state-diagram.svg">
<br>
</center>

# Transition options

You can change the class names that are applied
at the respective stages by supplying customized names in
the transition options alongside other options
```javascript
const options = {
  // css that will be injected in a style tag
  // alongside the animated templates
  // it preferable and more performant to just have classes
  // already present in your app so they will be simply assigned
  // default: undefined
  css = `.enter-active { /* .. */ }`,

  // override the classes assigned during enter transitions
  // if set to 'false' no enter transition is performed
  // default: as indicated below
  enter: {
    active: 'enter-active',
    from: 'enter-from',
    to: 'enter-to',
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
}
```

# Layout reflows

# Predefined transitions
