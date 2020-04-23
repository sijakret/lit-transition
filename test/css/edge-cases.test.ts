
import {html} from 'lit-element';
import {render} from 'lit-html';
import {transition, mark} from 'lit-transition'
import {assert} from 'chai';
import {quickDiv} from '../utils/dom';

// basic sanity tests for all stock transitions
suite('Edge cases', function() {

  test('shoud throw when not on node', async function() {
    await new Promise((resolve) => {
      window.addEventListener('error', resolve, {once:true});
      try {
        render(
          html`<div id=${transition('test')}>WRONG</div>`,
          document.body)
      } catch(e) {
        debugger
      }
    })
  })

  test('shoud handle undefined templates', async function() {
    const div = quickDiv();
    render(transition(undefined), div);
    div.remove();
  })

  test('shoud handle text templates', async function() {
    const div = quickDiv();
    render(transition('text'), div);
    assert(div.innerText === 'text');
    div.remove();
  })

  test('shoud not redraw same marked template', async function() {
    this.timeout(3000);
    const div = quickDiv();
    const marked = mark(transition(
      html`<span>M</span>`,
    ), 'marked');
    render(marked, div);
    // this should reuse the span
    render(mark(transition(
      html`<i>I</i>`,
    ), 'marked'), div)
    assert(!!div.querySelector('i'),
      'marked template renders immediately');

    render(mark(transition(
      html`<b>B</b>`,
    ), 'marked1'), div)
    assert(!!div.querySelector('i'),
      'different mark triggers transition');
    assert(!!div.querySelector('b'),
      'different mark triggers transition');
  })
  
})
