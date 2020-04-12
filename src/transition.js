import {directive} from 'lit-html';
import {transitionCSS} from './transition-css';
import {transitionAnim} from './transition-anim';


export const transition = directive(function transition(elem, opts = {}) {
  let {
    name = "swipe"
  } = typeof opts === Object ? opts : { name: opts };
  return name ? transitionAnim(elem, name) : undefined;
});

