(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{219:function(n,t,e){"use strict";e.r(t),e.d(t,"Comp",(function(){return a})),e.d(t,"code",(function(){return o}));var i=e(5),s=e(7);const r={mode:"out-in",enter:{active:"spin",from:"spin-enter",to:"spin-show"},leave:{active:"spin",from:"spin-show",to:"spin-leave"}};class a extends i.a{static get properties(){return{a:Boolean}}static get styles(){return i.b`
    .spin {
      transition: all 0.3s ease-in;
    }
    .spin-enter {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(0, 1, 0, 360deg) scale(4);
    }
    .spin-show {
      opacity: initial;
      filter: initial;
      transform: initial;
    }
    .spin-leave {
      opacity: 0.1;
      filter: blur(1px);
      transform: rotate3d(0, 1, 0, -360deg) scale(4);
    }`}get crazy(){return Object(s.transition)(this.a?i.c`<h2>DIZZZZY!</h2>`:i.c`<h2>Click me</h2>`,r)}render(){return i.c`<center @click=${()=>this.a=!this.a}>
      ${this.crazy}
    </center>`}}const o="\nimport {LitElement, html, css} from 'lit-element';\nimport {transition} from 'lit-transition';\n\nconst spin3D = {\n  mode: 'out-in',\n  enter: {\n    active: 'spin', \n    from: 'spin-enter',\n    to: 'spin-show',\n  },\n  leave: {\n    active: 'spin', // same class as active phase of enter\n    from: 'spin-show', // .. this one too!\n    to: 'spin-leave',\n  }\n}\nexport class Comp extends LitElement {\n  // a prop that we toggle and what will trigger redraw\n  static get properties() { return { a: Boolean } }\n  static get styles() {\n    return css`\n    .spin {\n      transition: all 0.3s ease-in;\n    }\n    .spin-enter {\n      opacity: 0.1;\n      filter: blur(1px);\n      transform: rotate3d(0, 1, 0, 360deg) scale(4);\n    }\n    .spin-show {\n      opacity: initial;\n      filter: initial;\n      transform: initial;\n    }\n    .spin-leave {\n      opacity: 0.1;\n      filter: blur(1px);\n      transform: rotate3d(0, 1, 0, -360deg) scale(4);\n    }`\n  }\n\n  // swapped template is transitioned automatically\n  get crazy() {\n    return transition( // <- this is all!\n      this.a ? html`<h2>DIZZZZY!</h2>` \n             : html`<h2>Click me</h2>`,\n      spin3D);\n  }\n  \n  render() {\n    return html`<center @click=${() => this.a = !this.a}>\n      ${this.crazy}\n    </center>`\n  } \n}\n"}}]);
//# sourceMappingURL=9.js.map