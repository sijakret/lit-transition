import './index.scss';
import 'highlight.js/styles/hybrid.css';

// Import the LitElement base class and html tag function
import { css, html, svg } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {cache} from 'lit-html/directives/cache';
import {index} from './loaders/md-loader?folder=./guide!';
import router from './router';
import {transition, slide, mark } from 'lit-transition';
import './demo';

//const transPage = land;
//const transTitle = land({y:'-30px', duration: 500});
//const transContent = land({y:'0px', scale: 1, duration: 500});

const transPage = {
  enter: ['animated', 'bounceIn', 'top'],
  leave: {
    active: ['animated', 'bounceOut', 'top', 'fixed'],
    lock: true
  },
  mode: 'out-in'
};
const transTitle = {
  enter: ['animated', 'zoomIn', 'top'],
  leave: {
    active: ['animated', 'zoomOut', 'top', 'fixed'],
    lock: true
  }
};
const transContent = transTitle;
window.transPage = transPage;


// routing
const routes = [
  {
    name: 'Home',
    pattern: '*'
  },
  ...index.map(i => ({
    name: i.title,
    index: i.index,
    pattern: i.file,
    data: {
      render: () => {
        // debugger
        // const im = await load(i.import);
        // const {default: page} = 
        return html`<div>${unsafeHTML(i.markdown)}</div>`;
      },
      title: i.title
    }
  }))
];

function show(sel, offset) {
  const top = document.querySelector(sel)
    .getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({top, behavior: 'smooth'});
}

// main app
class Component extends router(routes) {
  
  // make css bleed in
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div @click=${(e) => {
      if(e.target.tagName === 'A') {
        const href = e.target.href;
        if(href.startsWith(window.location.origin)) {
          e.preventDefault();
          this.navigate(href);
          show('#top');
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
      mark(html`<main>
        <a id="top"></a>
        <nav>
          ${this.nav}
        </nav>
        <content>
          ${transition(this.renderRouteTitle(),transTitle)}
          ${transition(this.renderRoute(), transContent)}
        </content>
      </main>`, 'page'),
      transPage
    )}
    </div>`;
  }

  get nav() {
    return index.map(i => {
      const active = this.route===i.title;
      return [
        html`<a href=${i.file} ?active=${active}>${i.title}</a>`,
        transition(active ? html`<ul>
          ${i.index.map((s,j) => html`<li>
          <a @click=${() => show('#sec-'+j, 100)}>${s}</a>
          </li>` )}
        </ul>` : undefined, slide())
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
  updated() {
  }
}

customElements.define('doc-app', Component);

// github logo :)
const github = svg`<svg width=24 height=24><path d="M12,2C6.48,2,2,6.59,2,12.25c0,4.53,2.87,8.37,6.84,9.73c0.5,0.09,0.68-0.22,0.68-0.49c0-0.24-0.01-0.89-0.01-1.74c-2.78,0.62-3.37-1.37-3.37-1.37c-0.45-1.18-1.11-1.5-1.11-1.5c-0.91-0.64,0.07-0.62,0.07-0.62c1,0.07,1.53,1.06,1.53,1.06c0.89,1.57,2.34,1.11,2.91,0.85c0.09-0.66,0.35-1.11,0.63-1.37c-2.22-0.26-4.56-1.14-4.56-5.07c0-1.12,0.39-2.03,1.03-2.75c-0.1-0.26-0.45-1.3,0.1-2.71c0,0,0.84-0.28,2.75,1.05c0.8-0.23,1.65-0.34,2.5-0.34c0.85,0,1.7,0.12,2.5,0.34c1.91-1.33,2.75-1.05,2.75-1.05c0.55,1.41,0.2,2.45,0.1,2.71c0.64,0.72,1.03,1.63,1.03,2.75c0,3.94-2.34,4.81-4.57,5.06c0.36,0.32,0.68,0.94,0.68,1.9c0,1.37-0.01,2.48-0.01,2.81c0,0.27,0.18,0.59,0.69,0.49c3.97-1.36,6.83-5.2,6.83-9.73C22,6.59,17.52,2,12,2"></path><svg>`
