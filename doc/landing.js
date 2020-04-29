import { LitElement, html} from 'lit-element';
import {asyncReplace} from 'lit-html/directives/async-replace.js';
import {transition} from 'lit-transition';
import {transTeaser as trans, transWaitBar} from './transitions';
import arrow from './assets/arrow.svg';

class Component extends LitElement {

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div><div>
      <div short>
        <div>
          <h1 underline>lit-transition</h1>
          
          <p>
            A tiny yet effective transition directive for lit-html
          </p>

          <a href="about">
            ${arrow}
            GET STARTED
          </a>
        </div>
      </div>
      <div teaser>
        ${asyncReplace(this.teaser())}
      </div>
    </div></div>`;
  }

  async *teaser() {
    while (true) {
      let one;
      teasers.push(one = teasers.splice(0,1)[0]);
      // wrapping a template using transition directive will
      // automatically animate it on change
      yield transition(one,trans);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

customElements.define('doc-landing', Component);

const teasers = [
html `
<h2>Dead simple</h2>
<doc-demo .code=${`
import {transition} from 'lit-transition';
// this template will change depending on 'cond'
const dynamic = cond ? \`Slim\` : \`<b>Bold</b>\`;
// when dynamic changes, it will animate automatically
render(
  html\`<b>\${transition(dynamic)}</b>\`,
  document.body
);`
}></doc-demo>`,
html `
<h2>Configurable</h2>
<doc-demo .code=${`
// use custom styles & hooks for transitions
transition(
  template, {
    mode: 'in-out',
    onAfterEnter: () => { /* hook */ }
    css: \`
      .my-enter {
        rotate3d(...)
      }\`
  }
)`
}></doc-demo>`
].map(t => html`<div>
${t}
${transition(html`<div></div>`, transWaitBar(5000))}
</div>`);