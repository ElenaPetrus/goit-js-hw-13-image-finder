
import galleryListTpl from './templates/gallery-items.hbs';
import './sass/main.scss';
import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';



const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
  };

  const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });
  const newsApiService = new NewsApiService();
  
  refs.searchForm.addEventListener('submit', onSearch);
  loadMoreBtn.refs.button.addEventListener('click', fetchImages);
  
  function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.query.value;
  
    if (newsApiService.query === '') {
      return alert('Type more symbols');
    }
  
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearGalleryContainer();
    fetchImages();
  }
  
  function fetchImages() {
    loadMoreBtn.disable();
    newsApiService.fetchImages().then(images => {
      appendImagessMarkup(images);
      loadMoreBtn.enable();
    });
  }
  
  function appendImagessMarkup(images) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', galleryListTpl(images));
  }
  
  function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
  }
