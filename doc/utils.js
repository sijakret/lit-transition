// scroll to an element with an of
export function scrolly(elem, offset = 0) {
  elem = document.querySelector(elem)
  if(elem) {
    const top = elem.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({top, behavior: 'smooth'});
  }
}