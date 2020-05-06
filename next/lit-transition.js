!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/lit-transition/next/",n(n.s=7)}([function(t,e,n){"use strict";n.d(e,"c",(function(){return r.a})),n.d(e,"e",(function(){return a.c})),n.d(e,"a",(function(){return i.d})),n.d(e,"b",(function(){return o.b})),n.d(e,"d",(function(){return c})),n.d(e,"f",(function(){return l}));var i=n(2);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const s=new class{handleAttributeExpressions(t,e,n,s){const o=e[0];if("."===o){return new i.e(t,e.slice(1),n).parts}return"@"===o?[new i.c(t,e.slice(1),s.eventContext)]:"?"===o?[new i.b(t,e.slice(1),n)]:new i.a(t,e,n).parts}handleTextExpression(t){return new i.d(t)}};var o=n(8),r=n(6),a=n(4);n(3),n(11),n(9),n(10),n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const c=(t,...e)=>new o.b(t,e,"html",s),l=(t,...e)=>new o.a(t,e,"svg",s)},function(t,e,n){"use strict";n.d(e,"f",(function(){return i})),n.d(e,"g",(function(){return s})),n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return l})),n.d(e,"c",(function(){return u})),n.d(e,"e",(function(){return d}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${s}`),r="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],a=document.createTreeWalker(e.content,133,null,!1);let l=0,f=-1,h=0;const{strings:p,values:{length:m}}=t;for(;h<m;){const t=a.nextNode();if(null!==t){if(f++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let i=0;for(let t=0;t<n;t++)c(e[t].name,r)&&i++;for(;i-- >0;){const e=p[h],n=d.exec(e)[2],i=n.toLowerCase()+r,s=t.getAttribute(i);t.removeAttribute(i);const a=s.split(o);this.parts.push({type:"attribute",index:f,name:n,strings:a}),h+=a.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(i)>=0){const i=t.parentNode,s=e.split(o),a=s.length-1;for(let e=0;e<a;e++){let n,o=s[e];if(""===o)n=u();else{const t=d.exec(o);null!==t&&c(t[2],r)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-r.length)+t[3]),n=document.createTextNode(o)}i.insertBefore(n,t),this.parts.push({type:"node",index:++f})}""===s[a]?(i.insertBefore(u(),t),n.push(t)):t.data=s[a],h+=a}}else if(8===t.nodeType)if(t.data===i){const e=t.parentNode;null!==t.previousSibling&&f!==l||(f++,e.insertBefore(u(),t)),l=f,this.parts.push({type:"node",index:f}),null===t.nextSibling?t.data="":(n.push(t),f--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(i,e+1));)this.parts.push({type:"node",index:-1}),h++}}else a.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const c=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},l=t=>-1!==t.index,u=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/},function(t,e,n){"use strict";n.d(e,"f",(function(){return l})),n.d(e,"a",(function(){return d})),n.d(e,"d",(function(){return h})),n.d(e,"b",(function(){return p})),n.d(e,"e",(function(){return m})),n.d(e,"c",(function(){return y}));var i=n(6),s=n(4),o=n(3),r=n(10),a=n(8),c=n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const l=t=>null===t||!("object"==typeof t||"function"==typeof t),u=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class d{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new f(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let i=0;i<e;i++){n+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(l(t)||!u(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class f{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o.a||l(t)&&t===this.value||(this.value=t,Object(i.b)(t)||(this.committer.dirty=!0))}commit(){for(;Object(i.b)(this.value);){const t=this.value;this.value=o.a,t(this)}this.value!==o.a&&this.committer.commit()}}class h{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(Object(c.c)()),this.endNode=t.appendChild(Object(c.c)())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=Object(c.c)()),t.__insert(this.endNode=Object(c.c)())}insertAfterPart(t){t.__insert(this.startNode=Object(c.c)()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;Object(i.b)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o.a,t(this)}const t=this.__pendingValue;t!==o.a&&(l(t)?t!==this.value&&this.__commitText(t):t instanceof a.b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):u(t)?this.__commitIterable(t):t===o.b?(this.value=o.b,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof r.a&&this.value.template===e)this.value.update(t.values);else{const n=new r.a(e,t.processor,this.options),i=n._clone();n.update(t.values),this.__commitNode(i),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const s of t)n=e[i],void 0===n&&(n=new h(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(s),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){Object(s.b)(this.startNode.parentNode,t.nextSibling,this.endNode)}}class p{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;Object(i.b)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue===o.a)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=o.a}}class m extends d{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new v(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class v extends f{}let g=!1;(()=>{try{const t={get capture(){return g=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class y{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;Object(i.b)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue===o.a)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=_(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=o.a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const _=t=>t&&(g?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)},function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i={},s={}},function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,n=null,i=null)=>{for(;e!==n;){const n=e.nextSibling;t.insertBefore(e,i),e=n}},o=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}}},,function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,s=t=>(...e)=>{const n=t(...e);return i.set(n,!0),n},o=t=>"function"==typeof t&&i.has(t)},function(t,e,n){"use strict";n.r(e),n.d(e,"TransitionMode",(function(){return m})),n.d(e,"GeometryLockMode",(function(){return v})),n.d(e,"fade",(function(){return _})),n.d(e,"land",(function(){return x})),n.d(e,"slide",(function(){return w})),n.d(e,"mark",(function(){return u})),n.d(e,"transition",(function(){return N}));var i=n(0);class s{constructor(t){this.classes=new Set,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.commit()}remove(t){this.classes.delete(t),this.commit()}commit(){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}let o=!1;var r=function(t){return o?new s(t):t.classList||new s(t)};function a(t){let e=t;for(;e=e.parentNode||e.host;)if(e instanceof HTMLElement)return e;return null}function c(t,e,n=!0){return new Promise(i=>{const s=new MutationObserver(async()=>{s.disconnect(),n&&await function t(e=1){return new Promise(n=>0==--e?requestAnimationFrame(()=>n()):n(t(e)))}(),i()});s.observe(t,{attributes:!0,attributeFilter:["class"]}),e&&e()})}const l=new WeakMap;function u(t,e){return l.set(t,e),t}let d;function f(){d=!document.hidden}f(),document.addEventListener("visibilitychange",f,!1);const h=new WeakMap;function p(t){return function(e,n){return async s=>{if(!(s instanceof i.a))throw new Error("The `transition` directive can only be used on nodes");e||(e=i.d`<div></div>`),"string"!=typeof e&&"number"!=typeof e||(e=i.d`<div style="display: inline-block">${e}</div>`);const o=(r=e,l.get(r));var r;let a=h.get(s);const{enter:c,leave:u,onEnter:d,onLeave:f,onAfterEnter:p,onAfterLeave:m,mode:v="in-out"}=n;function g(t){const e=new i.a(s.options);return e.appendIntoPart(s),e.setValue(t),e.commit(),e}function y(t){const{startNode:e,endNode:n}=t;try{e&&t.clear()}catch(n){}e&&e.parentNode&&e.parentNode.removeChild(e),n&&n.parentNode&&n.parentNode.removeChild(n)}async function _(e){d&&await d(),c&&await t.transition(e,c,n),p&&await p()}async function b(e){f&&await f(),u&&await t.transition(e,u,n),y(e),m&&await m()}if(a||h.set(s,a={children:new Map,styles:new Map,transition:n}),t.init&&t.init({transition:n,data:a,add:g,remove:y}),a.last&&o&&o===a.name)a.last.setValue(e),a.last.commit();else if(a.name=o,"in-out"===v){const t=a.last;await _(a.last=g(e)),t&&await b(t)}else if("out-in"===v){const t=a.last;t&&await b(t),await _(a.last=g(e))}else a.last&&b(a.last),await _(a.last=g(e))}}}var m,v;function g(t,e){const n=e();for(let t in n)e[t]=n[t];return Object.defineProperty(e,"name",{get:()=>t}),e}function y(t,e){for(var n in e)try{e[n].constructor==Object?t[n]=y(t[n],e[n]):t[n]=e[n]}catch(i){t[n]=e[n]}return t}!function(t){t.InOut="in-out",t.OutIn="out-in",t.Both="both"}(m||(m={})),function(t){t[t.None=0]="None",t[t.Lock=1]="Lock",t.Auto="auto"}(v||(v={}));const _=g("fade",(function(t={}){const{duration:e=500,ease:n="ease-out",opacity:i=0}=t;return y({enter:{active:"fade-enter-active",from:"fade-enter-from",to:"fade-enter-to"},leave:{active:"fade-leave-active",from:"fade-leave-from",to:"fade-leave-to",lock:!0},css:`\n    .fade-leave-active {\n      position: fixed;\n      transition: opacity ${e}ms ${n}, transform ${e}ms ${n};\n    }\n    .fade-enter-active {\n      transition: opacity ${e}ms ${n}, transform ${e}ms ${n};\n    }\n  .fade-enter-from, .fade-leave-to {\n    opacity: ${i};\n  }\n  .fade-enter-to, .fade-leave-from {\n    opacity: 1;\n  }\n  `},t)})),b={async transition(t,e,n){if(!d)return;const{duration:i=n.duration,active:s,from:o,to:l,lock:u}=e,f=function(t){return t.startNode.nextSibling}(t);if(!f)return;let h;u&&(u!==v.Auto||s&&function(t,e){const n=a(t);if(n){if("absolute"===(()=>{const t=document.createElement("div"),i=r(t),s=n.shadowRoot||n;var o;o=e,Array.isArray(o)?o.forEach(t=>i.add(t)):i.add(o),s.appendChild(t);const a=window.getComputedStyle(t).position;return s.removeChild(t),a})()){return"relative"===window.getComputedStyle(n).position}}return!1}(f,s))&&(h=function(t){const e=t.getBoundingClientRect();let n=0,i=0;{let e=t.offsetParent;for(;t&&t!==document&&!(t instanceof DocumentFragment)&&t!==e;)n+=t.offsetTop-(t.scrollTop||0),i+=t.offsetLeft-(t.scrollLeft||0),t=a(t)}return{left:i,top:n,width:e.width,height:e.height}}(f)),await new Promise(async t=>{const e=r(f),n=t=>Array.isArray(t)?t.forEach(t=>e.add(t)):e.add(t),a=t=>Array.isArray(t)?t.forEach(t=>e.remove(t)):e.remove(t);var u,d;function p(e){if(e){if(e.target!==f)return;e.preventDefault(),e.stopPropagation()}["transitionend","transitioncancel","animationend","animationcancel"].filter(t=>!e||t!==e.type).forEach(t=>f.removeEventListener(t,p)),s&&a(s),o&&a(o),l&&a(l),t()}h&&(d=h,(u=f).style.marginLeft="0px",u.style.marginTop="0px",u.style.left=d.left+"px",u.style.top=d.top+"px",u.style.width=d.width+"px",u.style.height=d.height+"px");const m={once:!0};i?setTimeout(p,i):(f.addEventListener("transitionrun",(function(){f.addEventListener("transitionend",p,m),f.addEventListener("transitioncancel",p,m)}),m),f.addEventListener("animationstart",(function(){f.addEventListener("animationend",p,m),f.addEventListener("animationcancel",p,m)}),m)),o&&await c(f,()=>n(o)),s&&await c(f,()=>n(s)),o&&a(o),l&&n(l)})},init({data:t,remove:e,add:n,transition:s}){if(t._cssSource!==s.css&&(t.css&&e(t.css),s.css)){t._cssSource=s.css;let e=s.css;e="string"==typeof e?i.d`<style>${e}</style>`:e,t.css=n(e)}}},x=g("land",(function(t={}){const{duration:e=500,ease:n="ease-out",opacity:i=0}=t;return y({enter:{active:"land1-enter-active",from:"land1-enter-from",to:"land1-enter-to"},leave:{active:"land1-leave-active",from:"land1-leave-from",to:"land1-leave-to"},mode:"both",css:`\n      .land1-enter-active {\n        transform-origin: 50% 50%;\n        transition: transform ${e}ms ${n}, opacity ${e}ms ${n};\n      }\n      .land1-leave-active {\n        transform-origin: 50% 50%;\n        position: absolute;\n        transition: transform ${e}ms ${n}, opacity ${e}ms ${n};\n      }\n      .land1-enter-from {\n        opacity: ${i};\n        transform: translate(0px, 0px) scale(3);\n      }\n      .land1-leave-to {\n        transform: translate(0px, 100px);\n        opacity: ${i};\n      }`},t)})),w=g("slide",(function(t={}){const{left:e,right:n,up:i,down:s}=t;let o={};e&&(o={x:"-100%",x1:"100%"}),n&&(o={x:"100%",x1:"-100%"}),i&&(o={y:"100%",y1:"-100%"}),s&&(o={y:"-100%",y1:"100%"});let{mode:r,duration:a=500,x:c="100%",y:l="0%",x1:u="",y1:d="",ease:f="ease-out",leavePosition:h="",opacity:p=0}=Object.assign(Object.assign({},o),t);return u=u||c,d=d||l,y({enter:{active:"slide-enter-active",from:"slide-enter-from"},leave:{active:"slide-leave-active",to:"slide-leave-to",lock:v.Auto},css:`\n    .slide-enter-active {\n      transition: transform ${a}ms ${f}, opacity ${a}ms ${f};\n    }\n    .slide-leave-active {\n      position: ${h||(r!==m.OutIn?"absolute":"initial")};\n      transition: transform ${a}ms ${f}, opacity ${a}ms ${f};\n    }\n    .slide-leave-to {\n      opacity: ${p};\n      transform: translate(${c}, ${l});\n    }\n    .slide-enter-from {\n      opacity: ${p};\n      transform: translate(${u}, ${d});\n    }`,mode:r},t)})),N=Object(i.c)((function(t,e=_){return"function"==typeof e&&(e=e()),p(b)(t,function(t={}){const{css:e,duration:n,enter:s={},leave:o={},mode:r=m.Both,onAfterEnter:a,onAfterLeave:c,onEnter:l,onLeave:u}=t;return{duration:n,css:i.d`<style>${e}</style>`,enter:0!=s&&(Array.isArray(s)||"string"==typeof s?{active:s}:Object.assign({active:"enter-active",from:"enter-from",to:"enter-to"},s)),leave:0!=o&&(Array.isArray(o)||"string"==typeof o?{active:o,lock:!1}:Object.assign({active:"leave-active",from:"leave-from",to:"leave-to",lock:!1},o)),onEnter:l,onLeave:u,onAfterEnter:a,onAfterLeave:c,mode:r}}(e))}))},function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return a}));var i=n(4),s=n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const o=` ${s.f} `;class r{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===t.indexOf("--\x3e",r+1);const a=s.e.exec(t);e+=null===a?t+(n?o:s.g):t.substr(0,a.index)+a[1]+a[2]+s.b+a[3]+s.f}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class a extends r{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,n=e.firstChild;return e.removeChild(n),Object(i.c)(e,n.firstChild),t}}},function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return o}));var i=n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function s(t){let e=o.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},o.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(i.f);return n=e.keyString.get(s),void 0===n&&(n=new i.a(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const o=new Map},function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(4),s=n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class o{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i.a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let r,a=0,c=0,l=o.nextNode();for(;a<n.length;)if(r=n[a],Object(s.d)(r)){for(;c<r.index;)c++,"TEMPLATE"===l.nodeName&&(e.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=e.pop(),l=o.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));a++}else this.__parts.push(void 0),a++;return i.a&&(document.adoptNode(t),customElements.upgrade(t)),t}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a}));var i=n(4),s=n(2),o=n(9);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const r=new WeakMap,a=(t,e,n)=>{let a=r.get(e);void 0===a&&(Object(i.b)(e,e.firstChild),r.set(e,a=new s.d(Object.assign({templateFactory:o.b},n))),a.appendInto(e)),a.setValue(t),a.commit()}}]);
//# sourceMappingURL=lit-transition.js.map