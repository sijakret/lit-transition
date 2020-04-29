import {render,html} from 'lit-html';

// check some basic imports
import {jhjhj, transition, mark} from 'lit-transition';

// super basic sanity test
render(jhjhj(mark(html`<div></div>`,'test'), document.body));