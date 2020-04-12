// ripped from here: https://github.com/Polymer/lit-html/blob/master/src/directives/class-map.ts
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
  element: Element;
  classes: Set<string> = new Set();
  changed = false;

  constructor(element: Element) {
    this.element = element;
    const classList = (element.getAttribute('class') || '').split(/\s+/);
    for (const cls of classList) {
      this.classes.add(cls);
    }
  }
  add(cls: string) {
    this.classes.add(cls);
    this.changed = true;
  }

  remove(cls: string) {
    this.classes.delete(cls);
    this.changed = true;
  }

  commit() {
    if (this.changed) {
      let classString = '';
      this.classes.forEach((cls) => classString += cls + ' ');
      this.element.setAttribute('class', classString);
    }
  }
}

export default function(element:Element) {
  return (element.classList || new ClassList(element)) as DOMTokenList | ClassList;
}