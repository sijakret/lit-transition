import { LitElement, html } from 'lit-element';
import { navigator, router } from 'lit-element-router';
import {index} from './loaders/md-loader?folder=./guide!';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

 
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
      return this.routeData && html`<h1 title>${this.routeData.title}</h1>`;
    }
    
    get renderContent() {
      return this.routeData && this.routeData.render();
    }
  }
};