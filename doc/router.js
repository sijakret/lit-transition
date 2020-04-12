import { LitElement, html } from 'lit-element';
import { navigator, router } from 'lit-element-router';

 
// OR
export default function(routes) {
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
  
    renderRouteTitle() {
      return this.routeData && html`<h1 title>${this.routeData.title}</h1>`;
    }
    renderRoute() {
      return this.routeData && this.routeData.render();
    }
  }
};