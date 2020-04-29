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
  
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      chunk: String,
      code: String,
      name: String
    }
  }

  async firstUpdated() {
    if(!this.code) {
      if(!this.chunk) {
        throw new Error('doc-demo needs either chunk or code')
      }
      let {Comp,render,template,code,run} = await load(this.chunk);
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
      } else if(run) {
        Comp = class Auto extends LitElement {
          render() {
            return undefined
          }
          updated() {
            run(this.shadowRoot);
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
    }
  }

  render() {
    if(!this.code) return undefined;
    const h = hljs.highlight('javascript', this.code.trim(), true).value;
    const code = unsafeHTML(`<pre class="hljs"><code>${h}</code></pre>`);
    if(!this.name) {
      // just return highlighted ode
      return code;
    } else {
      return html`
      ${code}
      <h3>Result</h3>
      <div class="result">
        ${unsafeHTML(`<${this.name}></${this.name}>`)}
      </div>
      `;
    }
  }
}

customElements.define('doc-demo', Component);