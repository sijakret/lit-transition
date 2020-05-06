(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{220:function(n,e,t){"use strict";t.r(e),t.d(e,"Comp",(function(){return a})),t.d(e,"code",(function(){return l}));var r=t(5),s=t(7);const i={mode:"out-in",enter:"swirl-enter",leave:["swirl-leave"]};class a extends r.a{static get properties(){return{a:Boolean}}static get styles(){return r.b`
    .swirl-enter {
      animation: swirl .35s;
    }
    .swirl-leave {
      animation: swirl .35s reverse;
    }
    @keyframes swirl {
      0% {
        transform: scale(3.0) rotate(600deg);
        filter: blur(3px);
        opacity: 0;
      }
      100% {
        transform: scale(1);
      }
    }`}render(){return r.c`<center @click=${()=>this.a=!this.a}>${Object(s.transition)(this.a?r.c`<h2>WROOHM!</h2>`:r.c`<h2>Click me</h2>`,i)}</center>`}}const l="\nimport {LitElement, html, css} from 'lit-element';\nimport {transition} from 'lit-transition';\n\nconst swirl = {\n  mode: 'out-in',\n  enter: 'swirl-enter',\n  leave: ['swirl-leave', /* more if needed */ ]\n}\n\nexport class Comp extends LitElement {\n  // a prop that we toggle and what will trigger redraw\n  static get properties() { return { a: Boolean } }\n  static get styles() {\n    return css`\n    .swirl-enter {\n      animation: swirl .35s;\n    }\n    .swirl-leave {\n      animation: swirl .35s reverse;\n    }\n    @keyframes swirl {\n      0% {\n        transform: scale(3.0) rotate(600deg);\n        filter: blur(3px);\n        opacity: 0;\n      }\n      100% {\n        transform: scale(1);\n      }\n    }`\n  }\n\n  render() {\n    return html`<center @click=${() => this.a = !this.a}>${\n      transition( \n        this.a ? html`<h2>WROOHM!</h2>` \n             : html`<h2>Click me</h2>`,\n        swirl)\n      }</center>`;\n  } \n}\n"}}]);
//# sourceMappingURL=10.js.map