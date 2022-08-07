import axios from "axios";

export default class FetchPhotos {

  constructor() {
    this.searchRequest = "";
    this.pageNumber = 1;
    this.cardsNumber = 40;
  }

  newFetch = () => {
    const PIXABAY_KEY = "29078045-8c2db167d821a84d590b709ce"
    const defaultApiSettings = "image_type=photo&orientation=horizontal&safesearch=true"
    const result = axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${this.searchRequest}&${defaultApiSettings}&page=${this.pageNumber}&per_page=${this.cardsNumber}`);
    result.then(() => this.pageNumber++);
    return result;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get request() {
    return this.searchRequest;
  }

  set request(newRequest) {
    this.searchRequest = newRequest;
  }
}