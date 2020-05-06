(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{222:function(n,t,e){"use strict";e.r(t),e.d(t,"Comp",(function(){return r})),e.d(t,"code",(function(){return a}));var i=e(5),s=e(7);async function o(n){return(await Promise.all(n.map(n=>fetch("https://source.unsplash.com/800x500/?"+n)))).map(({url:n})=>i.c`<img src=${(n=>!((new Image).src=n)||n)(n)}>`)}const l={mode:s.TransitionMode.Both,opacity:0};class r extends i.a{static get properties(){return{slides:Object,slide:Number}}static get styles(){return i.b`
    :host {
      position: relative;
      display: flex;
      height: 200px;
      overflow: hidden;
      border: 1px solid;
    }
    div {
      margin: auto;
    }
    [l],[r] {
      z-index: 1;
      position: absolute;
      top: 50%;
    }
    [l] {
      left: 5%;
    }
    [r] {
      right: 5%;
    }
    img {
      margin: auto;
      max-height: 100%;
      max-width: 100%;
    }
    `}constructor(){super(),this.slide=0,(async()=>{this.slides=await o(["house","beach","cat","dog","funny"])})()}skip(n=1){l.left=!!(n>0),l.right=!!(n<0);const t=this.slides.length;this.slide=(this.slide+n+t)%t}render(){return this.slides?this.slideshow:i.c`<div>Loading...</div>`}get slideshow(){return i.c`
    <button l @click=${()=>this.skip(-1)}>prev</button>
    <button r @click=${()=>this.skip(1)}>next</button>
    ${Object(s.transition)(this.slides[this.slide],Object(s.slide)(l))}`}}const a="\nimport { LitElement, html, css } from 'lit-element';\nimport { transition, TransitionMode, slide } from 'lit-transition';\n\n// helper that uses unsplash to get a list of <img> templates\nasync function getImages(topics) {\n  // brutal image preloader\n  const prel = (url) => !(new Image().src = url)||url;\n  const base = 'https://source.unsplash.com/800x500/?';\n  const slides = await Promise.all(topics.map(t => fetch(base+t)))\n    // slides is a list of image urls\n  return slides.map(({url}) => html`<img src=${prel(url)}>`);\n}\n\n// our base animation configuration\nconst anim = {\n  mode: TransitionMode.Both, // transition enter+leave concurrently\n  opacity: 0.0,              // fade in as well\n  // left: true,             <- will be set dynamically\n  // right: true             <- based on direction\n};\n\n// slideshow component\nexport class Comp extends LitElement {\n  static get properties() {\n    return { \n      slides: Object, // list of slides\n      slide: Number   // current slide\n    }\n  }\n  static get styles() {\n    // some styling, you don't really need this\n    // remove it and the slideshow will work but look more ugly\n    return css`\n    :host {\n      position: relative;\n      display: flex;\n      height: 200px;\n      overflow: hidden;\n      border: 1px solid;\n    }\n    div {\n      margin: auto;\n    }\n    [l],[r] {\n      z-index: 1;\n      position: absolute;\n      top: 50%;\n    }\n    [l] {\n      left: 5%;\n    }\n    [r] {\n      right: 5%;\n    }\n    img {\n      margin: auto;\n      max-height: 100%;\n      max-width: 100%;\n    }\n    `;\n  }\n  constructor() {\n    super();\n    this.slide = 0;\n    // get some cool images\n    (async () => {\n      // this.slides is also used know if we initialized\n      this.slides = await getImages(\n        [ 'house', 'beach', 'cat', 'dog', 'funny' ]\n      );\n    })();\n  }\n\n  skip(n = 1) {\n    anim.left = !!(n > 0)  // configure to slide left depending on n\n    anim.right = !!(n < 0) // configure to slide rigt depending on n\n    const num = this.slides.length; // we wrap here\n    this.slide = (this.slide + n + num) % num;\n  }\n\n  // show loading until we are ready\n  render() {\n    return !!this.slides ? this.slideshow : html`<div>Loading...</div>`;\n  }\n\n  get slideshow() {\n    // slideshow tremplate\n    return html`\n    <button l @click=${() => this.skip(-1)}>prev</button>\n    <button r @click=${() => this.skip(1)}>next</button>\n    ${transition(this.slides[this.slide], slide(anim))}`;\n  }\n}\n"}}]);
//# sourceMappingURL=12.js.map