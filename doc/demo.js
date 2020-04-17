import './index.scss';
import 'markdown-it-highlight/dist/index.css';
import 'highlight.js/styles/hybrid.css';
import hljs from 'highlight.js';
import {load} from './loaders/md-loader?folder=./guide!';

// Import the LitElement base class and html tag function
import { LitElement, html,css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {transition} from 'lit-transition';

let defs = new WeakMap();
let id = 0;

class Component extends LitElement {
  static get styles() {
    return css`
    .result {
      margin: 10px;
      padding: 10px;
      border-left: 2px solid rgba(0,0,0,0.2);
    }`
  }
  
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      chunk: { type: String }
    }
  }

  async firstUpdated() {
    const ctx = {...window.globals};
    for(let e in transition) {
      ctx[e] = transition[e];
    }

    let {Comp,render,template,code} = await load(this.chunk);
    this.code = code;
    if(render) {
      Comp = class Auto extends LitElement {
        render() {
          return render();
        }
      }
    } else if(template) {
      Comp = class Auto extends LitElement {
        render() {
          return template;
        }
      }
    }
    if(!defs.has(Comp)) {
      this.name = 'random-demo-'+(id++);
      customElements.define(this.name, Comp);
      defs.set(Comp, this.name);
    } else {
      this.name = defs.get(Comp);
    }
    this.requestUpdate();
  }

  render() {
    if(!this.name) return undefined;
    const h = hljs.highlight('javascript', this.code.trim(), true).value;
    return html`
    ${unsafeHTML(`<pre class="hljs"><code>${h}</code></pre>`)}
    <h3>Result</h3>
    <div class="result">
      ${unsafeHTML(`<${this.name}></${this.name}>`)}
    </div>
    `;
  }
}

customElements.define('doc-demo', Component);