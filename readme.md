
> IMPORTANT: this project has is still in it's setup phase!

# lit-transition

A directive to effortlessly animated transitions in lit-html.

![Build](https://github.com/sijakret/lit-transition/workflows/Build/badge.svg?branch=master)

## Documentation

Full documentation is available at [TODO](https://TODO).

Docs source is in the `docs` folder.

To build the library and the docs yourself,
clone it run `npm install` and `npm run build`.
This will build the library as well as the documentation.

## Overview

`lit-transition` is a directive for [lit-html](https://lit-html.polymer-project.org/) that will automatically generate animated tranistions when templates are swapped.

The library automatically detects your dom rerenders and supports css transitions based on `transitions` and `animations`.
It mostly manages a state cycle when your view is updated
by automatically appends and removes DOM nodes as they transition in and out.

```javascript
import {html, render} from 'lit-html';
import {transition} from 'lit-transition';

// This is a lit-html template function. It returns a lit-html template.
const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;

// This renders <div>Hello Steve!</div> to the document body
render(transition(helloTemplate('Steve')), document.body);

// This updates to <div>Hello Kevin!</div>, while looking cool
render(transition(helloTemplate('Kevin')), document.body);
```

## Installation

```bash
$ npm install lit-transition
```

## Roadmap

* add js hooks
* add transitions via web animation

## Contributing

Happy to accept PRs!