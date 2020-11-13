import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function showLargeImage(e) {
  const instance = basicLightbox.create(`
      <img src="${e.target.src}" width="800"
          height="600" alt="${e.target.alt}">
      `);

  instance.show();
}
