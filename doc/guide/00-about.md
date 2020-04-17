About

lit-transition is a set of directives for lit-html inspired by the concepts of the beautiful [transition system of vue.js](https://vuejs.org/v2/guide/transitions.html).

The library is tiny and tree-shakeable and will add no more than TODO kb (gzipped) to your web app.

It mainly orchestrates lifecycle transitions when a dom node is updated and adds css classes or executes web animations in step with these transitions.

Currently we only support transition [web animations](https://developer.mozilla.org/de/docs/Web/API/Web_Animations_API) and [css transitions](https://developer.mozilla.org/de/docs/Web/CSS/transition)

All animations in this documentation are obviously built using `lit-transition` :)

<script>
import {html} from 'lit-html'
import {asyncReplace} from 'lit-html/directives/async-replace.js';
import {transition, land} from 'lit-transition';

// generates a new
async function* count() {
  while (true) {
    yield transition(new Date().toLocaleString(),land);
    await new Promise(r => setTimeout(r, 1000));
  }
}

export const render = () => html`
  <div>lit! ${asyncReplace(count())}</div>`;
</script>