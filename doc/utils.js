// scroll to an element with an of
export function scrolly(elem, offset = 0) {
  elem = document.querySelector(elem)
  if(elem) {
    const scroll = document.querySelector('main');
    const top = elem.offsetTop - offset;
    scroll.scrollTo({top, behavior: 'smooth'});
  }
}