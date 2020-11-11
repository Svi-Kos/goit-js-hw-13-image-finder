import debounce from 'lodash.debounce';
import './styles.css';
import galleryTpl from './templates/gallery-item-card.hbs';
import ImagesApiService from './js/apiService';
import getRefs from './js/refs';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.imagesContainer.addEventListener('click', showLargeImage);

async function onSearch(event) {
  const form = event.target;

  imagesApiService.query = form.value;
  if (form.value === '') {
    return alert('Please enter a more specific query!');
  }
  imagesApiService.resetPage();
  return await imagesApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      return alert('Please enter a more specific query!');
    }
    clearImagesContainer();
    appendImagesMarkup(hits);
  });
}

async function onLoadMore() {
  return await imagesApiService
    .fetchImages()
    .then(appendImagesMarkup)
    .then(scrollToNewElements);
}

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function scrollToNewElements() {
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

function showLargeImage(e) {
  const instance = basicLightbox.create(`
  <img src="${e.target.src}" width="800"
      height="600" alt="${e.target.alt}">
  `);

  instance.show();
}
