import './index.scss';
import 'markdown-it-highlight/dist/index.css';
import 'highlight.js/styles/hybrid.css';

// Import the LitElement base class and html tag function
import { LitElement, html} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

class Component extends LitElement {

  firstUpdated() {
    const {transition,LitElement,html} = window.globals;
    this.name = 'random-demo-'+String(Math.random()).split('.')[1];
    let code = this.innerHTML.replace('<--','').replace('-->','');
    code = code.replace(/.*import .*/g, '');
    const elem = eval(`(() => ${code})()`)
    customElements.define(this.name, elem);
    this.requestUpdate();
  }

  render() {
    if(!this.name) return undefined;
    return html`
    <h3>Result</h3>
    ${unsafeHTML(`<${this.name}></${this.name}>`)}
    `
  ;
  }
}

customElements.define('doc-demo', Component);