import debounce from 'lodash.debounce';
import './styles.css';
import galleryTpl from './templates/gallery-item-card.hbs';
import ImagesApiService from './js/apiService';
import getRefs from './js/refs';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  const form = event.target;

  imagesApiService.query = form.value;
  if (form.value === '') {
    return alert('Please enter a more specific query!');
  }
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      return alert('Please enter a more specific query!');
    }
    clearImagesContainer();
    appendImagesMarkup(hits);
  });
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
