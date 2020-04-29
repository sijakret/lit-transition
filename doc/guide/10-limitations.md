Limitations and Notes


# General remarks

This goes without saying, but be aware that..

* animating large sections of your web app will 
  most certainly come at a __performance cost__.
* transitions need to be employed with care
  so they don't interrupt the user experience.
  Where transitions block user interaction,
  __200ms__ should typically not be exceeded.


# Single roots

Templates passed to the `transition` directive are currently required to have only one
root node.
Templates with multipe root nodes will work but will not animate all children.

```javascript
// will not work as expected
export const render = () => 
  transition(html`<div>..</div><div>..</div>`);

// will work as expected
export const render = () => 
  transition(html`<div>..</div>`);
```

# Interplay with other directives

Since lit-transition manages the rendered dom and holds on to
references during transitions, mixing it with other directives that do
the same may lead to undesired effects.

```javascript
// will not animate
export const render = () =>
  html`${(transition(asyncReplace(/*temlplate*/))}`;
```

