import {directive} from 'lit-html';
import {transitionCSS} from './transition-css';

export * from './styles';

export const transition = directive(function transition(elem, opts = {}) {
  let {
    name = "swipe"
  } = typeof opts === Object ? opts : { name: opts };
  return name ? transitionCSS(elem, name) : undefined;
});

