import './index.scss';
import 'highlight.js/styles/atelier-savanna-dark.css';
import './demo';
import './landing';

import { html } from 'lit-element';
import {cache} from 'lit-html/directives/cache';
import {index} from './loaders/md-loader?folder=./guide!';
import router from './router';
import {transition, mark } from 'lit-transition';
import {transLanding,transContent,transTitle,transSubNav} from './transitions';
import github from './assets/github.svg';
import { publicPath } from './config';


// main app
class Component extends router() {

  render() {
    return html`
    <div app @click=${(e) => {
      if(e.target.tagName === 'A') {
        const href = e.target.href;
        if(href.startsWith(window.location.origin)) {
          e.preventDefault();
          this.navigate(href);
          //this.navigate(publicPath + href.replace(window.location.origin,''));
        }
      }
    }}>
    ${cache(
      html`<header>
      <a href=${this.baseRoute} underline>
        lit-transition
        <span>${require('../package.json').version}</span>
      </a>
      <a href=https://github.com/sijakret/lit-transition>${github}</a>
      <a href=${index[0].route}>doc</a>
    </header>`
    )}
    ${transition(
      this.route === 'Landing' ?
        mark(html`<doc-landing></doc-landing>`, 'landing') :
        mark(this.page, 'page')
      , transLanding
    )}
    </div>`;
  }

  get nav() {
    return index.map(i => {
      const active = this.route===i.title;
      return [
        html`<a href=${i.route} ?active=${active}>${i.title}</a>`,
        // subsections
        transition(active ? mark(html`<ul>
          ${i.index.map((s,j) => html`<li>
          <a href=${`${i.route}#sec-${j}`}>${s}</a>
          </li>` )}
        </ul>`,i.route+'-sub') : undefined, transSubNav)
      ]
    });
  }
  
  get page() {
    return html`<div layout>
      <nav>
        ${this.nav}
      </nav>
      <main>
        <div id="top"></div>
        <content>
          ${transition(this.routeTitle, transTitle)}
          ${transition(this.renderContent, {
            ...transContent
          })}
        </content>
      </main>
    </div>`;
  }
}

customElements.define('doc-app', Component);