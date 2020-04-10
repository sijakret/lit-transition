// Import the LitElement base class and html tag function
import { LitElement, html, css } from 'lit-element';
import {transition, swipe as move} from 'transition';
import {guard} from 'lit-html/directives/guard';

const instances = new Map();

class Component extends LitElement {
  
  static get properties() {
    return {
      name: {
        type: String
      }
    }
  }

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    instances.set(this.name, (instances.get(this.name)||0)+1);
    this.requestUpdate();
  }

  static get styles() {
    return css`

    :host > div {
      position: absolute;
      left: 0px;
      right: 0px;
      top:0px;
      bottom: 0px;
      display: flex
    }
    :host > div > div {
      margin: auto;
      font-size: 20px;
    }`;
  }

  render() {
    return html`
    <div><div>${instances.get(this.name)}</div></div>
    <slot></slot>`;
  }
}

customElements.define('mount-count', Component);