import './index.scss';
import 'markdown-it-highlight/dist/index.css';

// Import the LitElement base class and html tag function
import { LitElement, html, css } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import index from './loaders/index?folder=./guide!./loaders/index';
import router from './router';
import {transition, land } from '../src/transition-anim';

const transPage = land({scale: 1.2, duration: 500 });;
const transTitle = land({y:'-30px', duration: 500});
const transContent = land({y:'0px', scale: 1, duration: 500});

const routes = [
  {
    name: 'Home',
    pattern: '*'
  },
  ...index.map(i => ({
    name: i.title,
    pattern: i.file,
    data: {
      render: () => html`<div>${unsafeHTML(i.data)}</div>`,
      title: i.title
    }
  }))
];

class Component extends router(routes) {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <page @click=${e => {
     if(e.target.tagName === 'A') {
      e.preventDefault();
      this.navigate(e.target.href)
     }
    }}>
    <header>
      <a href="/">lit-transition</a>
    </header>
    ${transition(
      this.route === 'Home' ?
      this.home :
      html`<main>
        <nav>
          ${this.nav}
        </nav>
        <content>
          ${transition(this.renderRouteTitle(),transTitle)}
          <demo-land></demo-land>
          ${transition(this.renderRoute(), transContent)}
        </content>
      </main>`,
      transPage
    )}
    <page>`;
  }

  get nav() {
    return index.map(i => {
      return html`<a href=${i.file} ?active=${this.route===i.title}>${i.title}</a>`
    });
  }
  
  get home() {
    return html`<div home>
      <center>
      <h1><a href="01-getting-started.md">sers</a></h1>
      </center>
    </home>`;
  }
}

customElements.define('doc-app', Component);
