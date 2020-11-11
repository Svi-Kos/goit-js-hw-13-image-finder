const API_KEY = '18966198-cc77d794ba7550ec695901208';
const BASE_URL = 'https://pixabay.com/api';
const ITEMS_PER_PAGE = '12';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${ITEMS_PER_PAGE}&key=${API_KEY}`;

    const response = await fetch(url);
    return await response.json().then(({ hits }) => {
      this.page += 1;

      return hits;
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
