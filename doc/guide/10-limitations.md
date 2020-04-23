Limitations and Notes

Here is a list of things that do currently not work

# Performance hit

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

# Element

