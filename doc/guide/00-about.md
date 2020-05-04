About

lit-transition is a directive for [lit-html](https://lit-html.polymer-project.org/)
that enables animated transitions between templates.
It is in parts inspired by the [transition system of vue.js](https://vuejs.org/v2/guide/transitions.html).

lit-transition is written in typescript, extremely tiny and tree-shakeable.
It mainly orchestrates state transitions when a lit-html template is updated.
By adding css classes or executing js-based animations and delaying the removal or insertion of new DOM, transitions can be played.

Currently we only support [css transitions](https://developer.mozilla.org/de/docs/Web/CSS/transition) [css animations](https://developer.mozilla.org/de/docs/Web/CSS/animation).
However, the plan is to eventually also transparently support [web animations](https://developer.mozilla.org/de/docs/Web/API/Web_Animations_API).

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
    yield transition(html`<div style="display: inline-block">
        ${new Date().toLocaleString()}
      </div>`, land);
    await new Promise(r => setTimeout(r,1000));
  }
}
// asyncReplace directive updates on as generator yields
export const template = html`lit! ${asyncReplace(count())}`;
</script>


Head over to the [Getting Started](getting-started) section to get set up.