// ripped from here: https://github.com/Polymer/lit-html/blob/master/src/directives/class-map.ts
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
  element: Element;
  classes: Set<string> = new Set();

  constructor(element: Element) {
    this.element = element;
    const classList = (element.getAttribute('class') || '').split(/\s+/);
    for (const cls of classList) {
      this.classes.add(cls);
    }
  }
  add(cls: string) {
    this.classes.add(cls);
    this.commit()
  }

  remove(cls: string) {
    this.classes.delete(cls);
    this.commit()
  }

  commit() {
    let classString = '';
    this.classes.forEach((cls) => classString += cls + ' ');
    this.element.setAttribute('class', classString);
  }
}

let forceClassList:Boolean = false;

export default function(element:Element) {
  return !forceClassList ?
    (element.classList || new ClassList(element)) :
      new ClassList(element) as DOMTokenList | ClassList;
}

export function setForceClassList(force:Boolean) {
  forceClassList = force;
}