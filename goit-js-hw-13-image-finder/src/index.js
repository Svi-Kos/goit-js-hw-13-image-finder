import debounce from 'lodash.debounce';
import './styles.css';
import galleryTpl from './templates/gallery-item-card.hbs';
import ImagesApiService from './js/apiService';
import getRefs from './js/refs';
import showLargeImage from './js/largeImageFunc';
import scrollToNewElements from './js/scrollFunc';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.imagesContainer.addEventListener('click', showLargeImage);

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

// підгрузка зображень по кнопці load more (1 варіант на промісах, 2 варіант на async/await)

// function onLoadMore() {
//   imagesApiService
//     .fetchImages()
//     .then(appendImagesMarkup)
//     .then(scrollToNewElements);
// }

// async function onLoadMore() {
//   const fetchIm = await imagesApiService.fetchImages();
//   const appendIm = await appendImagesMarkup(fetchIm);
//   const scrollIm = await scrollToNewElements();
// }

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.query !== '') {
      imagesApiService.fetchImages().then(appendImagesMarkup);
    }
  });
}

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);
