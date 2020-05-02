import { LitElement, html } from 'lit-element';
import { navigator, router } from 'lit-element-router';
import {index} from './loaders/md-loader?folder=./guide!';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

import { mark } from 'lit-transition';
import { scrolly } from './utils';

const publicPath = '/lit-transition/'

// routing
const routes = [
  {
    name: 'Landing',
    pattern: publicPath + '*'
  },
  ...index.map(i => ({
    name: i.title,
    index: i.index,
    pattern: (i.route = publicPath + i.file.slice(3,-3)),
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

    get baseRoute() {
      return publicPath;
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

    navigate(href) {
      super.navigate(href);
      this.scroll(href);
    }

    scroll(href) {
      const anchor = (href+'#top').split('#')[1];
      scrolly('#'+anchor, anchor!='top'?100:0);
    }

    firstUpdated() {
      // the proper wayof doing this would be
      // to make sure the page has rendered..
      setTimeout(() => {
        this.scroll(window.location.href);
      }, 100);
    }
  
    get routeTitle() {
      return this.routeData && mark(html`<h1 title>
        ${this.routeData.title}
      </h1>`, this.routeData.title+'title');
    }
    
    get renderContent() {
      return this.routeData && mark(this.routeData.render(),
      this.routeData.title+'title');
    }
  }
};