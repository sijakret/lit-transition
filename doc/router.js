import { LitElement, html } from 'lit-element';
import { navigator, router } from 'lit-element-router';
import {index} from './loaders/md-loader?folder=./guide!';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

import {transition, slide, mark } from 'lit-transition';
 
// routing
const routes = [
  {
    name: 'Home',
    pattern: '*'
  },
  ...index.map(i => ({
    name: i.title,
    index: i.index,
    pattern: (i.route = i.file.slice(3,-3)),
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

export default function() {
  return class Router extends navigator(router(LitElement)) {
    static get properties() {
      return {
        route: { type: String },
        params: { type: Object },
        query: { type: Object },
        routeData: { type: Object }
      };
    }
  
    static get routes() {
      return routes;
    }

    // make css bleed in
    createRenderRoot() {
      return this;
    }
  
    constructor() {
      super();
      this.route = '';
      this.params = {};
      this.query = {};
    }
  
    router(route, params, query, data) {
      this.route = route;
      this.params = params;
      this.query = query;
      this.routeData = data;
    }
  
    get routeTitle() {
      return this.routeData && mark(html`<h1 title>
        ${this.routeData.title}
        <div></div>
      </h1>`, this.routeData.title+'title');
    }
    
    get renderContent() {
      return this.routeData && mark(this.routeData.render(),
      this.routeData.title+'title');
    }
  }
};