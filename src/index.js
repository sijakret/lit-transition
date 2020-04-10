// Import the LitElement base class and html tag function
import { LitElement, html, css } from 'lit-element';
import {transition, swipe as move} from 'transition';
import './mount-count';

class Component extends LitElement {
  
  static get properties() {
    return {
      index: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.index = 0;
  }

  static get styles() {
    return css`
    .container {
      margin: auto;
      border: 1px solid #000000;
      width: 300px;
      height: 300px;
      display: flex;
      position: relative;
    }
    mount-count {
      flex: 1 1;
    }`;
  }
  
  cycle(delta) {
    if(delta > 0) {
      this.transition = move({direction: 'left'})
    } else {
      this.transition = move({direction: 'right'})
    }
    this.index = (this.index+=delta+3)%3;
  }

  render() {
    return html`
    <div class="container">
      ${transition(this.renderContent(), this.transition)}
    </div>
    <button @click=${() => this.cycle(-1)}>prev</button>
    <button @click=${() => this.cycle(1)}>next</button>`;
  }

  renderContent() {
    switch(this.index) {
      case 0:
        return html`<mount-count name="a">A</mount-count>`;
        
      case 1:
        return html`<mount-count name="b">B</mount-count>`;
      case 2:
        return html`<mount-count name="c">C</mount-count>`;
    }
  }
}

customElements.define('transition-simple', Component);