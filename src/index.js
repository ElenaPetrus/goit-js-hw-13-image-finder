
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert} from '@pnotify/core';
import galleryListTpl from './templates/gallery-items.hbs';
import './sass/main.scss';
import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';
import {onGallerylClick} from './js/modal.js';



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
  loadMoreBtn.refs.button.addEventListener('click', handleButtonClick);
  refs.galleryContainer.addEventListener('click', onGallerylClick);


  
  function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.query.value.trim();
    // console.log(newsApiService.query)
      
    if (newsApiService.query === '') {
      return alert({
        type: 'notice',
        text: 'Type more letters',
        delay: 1000,
      });
    }
  
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearGalleryContainer();
    fetchImages();
  }

  
  function fetchImages() {
   
    loadMoreBtn.disable();
    newsApiService.fetchImages().then(hits => {
      appendImagessMarkup(hits);
      loadMoreBtn.enable();
      handleButtonClick();
      
      if (hits.length === 0) {
         // {"total":0,"totalHits":0,"hits":[]}
        loadMoreBtn.hide();

        return alert({
              type: 'notice',
              text: 'Nothing found. Please specify your request.',
              delay: 2000,
            });
      }

    });

  }
  
  function appendImagessMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', galleryListTpl(hits));
  }

  function handleButtonClick() {
    loadMoreBtn.refs.button.scrollIntoView({block: "end", behavior: "smooth"});
 }
 
  
  function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
  }

// // ----async function-----
//   async function fetchImages(){
//     loadMoreBtn.disabled();

//     try {
//     const hits = await newsApiService.fetchImages();
//     if (hits.total === 0) {
      
//       loadMoreBtn.hide();

//       return alert({
//             type: 'notice',
//             text: 'Nothing found. Please specify your request.',
//             delay: 2000,
//           });
//     }
//       appendImagessMarkup(hits);
//       loadMoreBtn.enable();
//       handleButtonClick();
      
//       function appendImagessMarkup(hits) {
//         refs.galleryContainer.insertAdjacentHTML('beforeend', galleryListTpl(hits));
//       }
  

//     }
  
//   catch(error) {
//     console.log(`Something's gone wrong: ${error}`)
//   }
// }
