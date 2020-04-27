import {LitElement} from 'lit-element';
/**
 * base class for simple test cases
 */
export class TestComponent extends LitElement {

  /**
   * get component in dom
   * @param detail 
   */
  dom(selector:string) :any {
    const elems = this.shadowRoot!.querySelectorAll(selector);
    if(elems.length > 1) {
      return Array.from(elems);
    } else if(elems.length === 1) {
      return elems[0];
    } else {
      return null;
    }
  }

  /**
   * call this in derived class to conclude test
   * @param detail result to resolve to
   */
  resolve(detail: any = undefined) {
    this.dispatchEvent(new CustomEvent('resolve', {
      detail,
      composed: true,
      bubbles: true
    }));
    // remove ourselves
    this.parentElement!.removeChild(this);
  }
}

/**
 * Mounts component and resolves once component
 * emits 'resolve' event
 * @param Comp component that will be registered and mounted
 */
export function compTest(testName:string, Comp:CustomElementConstructor) {
  test(testName, function(){ return mountComp.call(this,Comp) });
}

/**
 * Resolves once component
 * emits 'resolve' event
 * @param Comp component that will be registered and mounted
 */
export function mountComp(Comp:CustomElementConstructor) {
  this.timeout(5000);
  return new Promise((resolve,reject) => {
    try {

      const name = 'test-'+(''+Math.random()).split('.').pop();
      customElements.define(name, Comp);
      const instance = document.createElement(name);
      document.body.appendChild(instance);
      instance.addEventListener('resolve', resolve, {once:true});
    } catch(e) {
      reject(e);
    }
  });
}
