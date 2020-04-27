import {render,html} from 'lit-html';
import {transition, mark} from 'lit-transition';

// super basic sanity test
render(transition(mark(html`<div></div>`,'test'), document.body));