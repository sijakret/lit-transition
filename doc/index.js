import './index.scss';
import 'highlight.js/styles/hybrid.css';
import './demo';

import { html } from 'lit-element';
import {cache} from 'lit-html/directives/cache';
import {index} from './loaders/md-loader?folder=./guide!';
import router from './router';
import {transition, slide, mark } from 'lit-transition';
import {transPage,transContent,transTitle} from './transitions';
import {github, scrolly} from './utils';

// main app
class Component extends router() {
  
  // make css bleed in
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div app @click=${(e) => {
      if(e.target.tagName === 'A') {
        const href = e.target.href;
        if(href.startsWith(window.location.origin)) {
          e.preventDefault();
          this.navigate(href);
          // for nav links we scroll to top!
          if(document.querySelector('nav').contains(e.target)) {
            scrolly('#top');
          }
        }
      }
    }}>
    ${cache(
      html`<header>
      <a href="/">lit-transition <span>${require('../package.json').version}</span></a>
      <a href=${index[0].file}>${github}</a>
      <a href=${index[0].file}>doc</a>
    </header>`
    )}
    ${transition(
      this.route === 'Home' ?
        mark(this.home,'home') :
        mark(this.page, 'page')
      , transPage
    )}
    </div>`;
  }

  get nav() {
    return index.map(i => {
      const active = this.route===i.title;
      return [
        html`<a href=${i.file} ?active=${active}>${i.title}</a>`,
        // subsections
        transition(active ? html`<ul>
          ${i.index.map((s,j) => html`<li>
          <a @click=${() => scrolly('#sec-'+j, 100)}>${s}</a>
          </li>` )}
        </ul>` : undefined, slide({mode: 'out-in'}))
      ]
    });
  }
  
  get home() {
    return html`<div home>
      <center>
      <h1><a href="01-getting-started.md">sers</a></h1>
      </center>
    </home>`;
  }
  
  get page() {
    return html`<nav>
      ${this.nav}
    </nav>
    <main>
      <a id="top"></a>
      <content>
        ${transition(this.routeTitle, transTitle)}
        ${transition(this.renderContent, transContent)}
      </content>
    </main>`
  }
  updated() {
  }
}

customElements.define('doc-app', Component);