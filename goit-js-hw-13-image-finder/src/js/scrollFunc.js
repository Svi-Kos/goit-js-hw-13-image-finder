import getRefs from '../js/refs';
const refs = getRefs();

export default function scrollToNewElements() {
  const elemScrollTo = refs.imagesContainer.lastElementChild;

  setTimeout(() => {
    elemScrollTo.scrollIntoView({
      behavior: 'smooth',
    });
    window.scrollBy({
      top: -250,
      left: 0,
      behavior: 'smooth',
    });
  });
}
