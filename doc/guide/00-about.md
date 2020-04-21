About

lit-transition is a directive for [lit-html](https://lit-html.polymer-project.org/)
that allows to for animated transitions between lit-html templates during rendering
in a dead simple way.
It was inspired by the concepts of beautiful [transition system of vue.js](https://vuejs.org/v2/guide/transitions.html).

The library is written in typescript, tiny and tree-shakeable and will add no more than TODO kb (gzipped) to your web app.
It mainly orchestrates state transitions when a template is updated by adding css classes, executing web animations and delaying the removal or insertion of new dom.

Currently we only support [css transitions](https://developer.mozilla.org/de/docs/Web/CSS/transition).
However, the plan is to transparently support [web animations](https://developer.mozilla.org/de/docs/Web/API/Web_Animations_API) eventually.

All animations in this documentation are obviously built using lit-transition.

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


Check out the following example

<script>
import {html} from 'lit-html'
import {asyncReplace} from 'lit-html/directives/async-replace.js';
import {transition, land} from 'lit-transition';

// generates a new date once a second
async function* count() {
  while (true) {
    yield transition(new Date().toLocaleString(),land);
    await new Promise(r => setTimeout(r, 1000));
  }
}

export const render = () =>
  html`<div>lit! ${asyncReplace(count())}</div>`;
</script>