About

lit-transition is a directive for [lit-html](https://lit-html.polymer-project.org/)
that enables animated transitions between templates in a dead simple way.
It is largely inspired by the concepts of the beautiful [transition system of vue.js](https://vuejs.org/v2/guide/transitions.html).

lit-transition is written in typescript, extremely tiny and tree-shakeable.
It mainly orchestrates state transitions when a lit-html template is updated.
By adding css classes or executing js-based animations and delaying the removal or insertion of new DOM, transitions can be played.

TODOTODOTODO
Currently we only support [css transitions](https://developer.mozilla.org/de/docs/Web/CSS/transition).
However, the plan is to transparently support [web animations](https://developer.mozilla.org/de/docs/Web/API/Web_Animations_API) eventually.

<!-- script>
import {render,html} from 'lit-html'
import {transition} from 'lit-transition';

// dom node is an HTMLElement
export async function run(domNode) {
  // This is a lit-html template function. It returns a lit-html template.
  const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;

  // This renders <div>Hello Steve!</div> to the document body
  render(transition(helloTemplate('Steve')), domNode);

  // wait a bit
  await new Promise(r => setTimeout(r,1000));

  // This updates to <div>Hello Kevin!</div>, while looking cool
  render(transition(helloTemplate('Kevin')), domNode);
}
</script-->


Check out the following example:

<script>
import {html} from 'lit-html'
import {asyncReplace} from 'lit-html/directives/async-replace.js';
import {transition, land} from 'lit-transition';

// generates a new date once a second
async function* count() {
  while (true) {
    // wrapping a template using transition directive will
    // automatically animate it on change
    yield transition(new Date().toLocaleString(),land);
    await new Promise(r => setTimeout(r, 1000));
  }
}

export const render = () => html`lit! ${asyncReplace(count())}`;
</script>


Head over to the [Getting Started](/getting-started) section to get set up.