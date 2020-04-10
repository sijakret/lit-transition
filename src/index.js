// Import the LitElement base class and html tag function
import { LitElement, html, css } from 'lit-element';
import {transition, swipe as move} from 'transition';

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
      overflow: hidden;
      border: 1px solid #000000;
      width: 300px;
      height: 300px;
      display: flex;
      position: relative;
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
    <div class="container" >
      ${transition(this.renderContent(), this.transition)}
    </div>
    <button @click=${() => this.cycle(-1)}>prev</button>
    <button @click=${() => this.cycle(1)}>next</button>`;
  }

  renderContent() {
    switch(this.index) {
      case 0:
        return html`
            <tpv-viewer 
            baseImage="https://view-demo-data.azurewebsites.net/wado/studies/1.3.6.1.4.1.14519.5.2.1.4429.7055.304625516276205756661744279896/series/1.3.6.1.4.1.14519.5.2.1.4429.7055.276192313544103095643438879237"></tpv-viewer>
            `;
        
      case 1:
        return html`
          <tpv-viewer 
          baseImage="https://view-demo-data.azurewebsites.net/wado/studies/1.3.6.1.4.1.14519.5.2.1.4429.7055.304625516276205756661744279896/series/1.3.6.1.4.1.14519.5.2.1.4429.7055.276192313544103095643438879237"></tpv-viewer>
          `;
      case 2:
        return html`<tpv-viewer 
            baseImage="https://view-demo-data.azurewebsites.net/wado/studies/1.3.6.1.4.1.14519.5.2.1.4429.7055.304625516276205756661744279896/series/1.3.6.1.4.1.14519.5.2.1.4429.7055.276192313544103095643438879237"></tpv-viewer>
          `;
    }
  }
}

customElements.define('transition-simple', Component);