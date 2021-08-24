const API_KEY = '23028809-0eadab1d20ccc1cb386303aa3';
const BASE_URL = 'https://pixabay.com/api';
// const options = {
//   headers: {
//   },
// };

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error=>{
        console.log(`Something's gone wrong: ${error}`)
      });
  }

  // // ----async function-----
  // async fetchImage() {
  //   const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`,
  //   );

  //   const {hits: images} = await response.json();
  //   this.incrementPage();

  //   return images;
  // }
  

  incrementPage() {
    this.page += 1;
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

