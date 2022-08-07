import axios from "axios";

export default class PhotoService {

  constructor() {
    this.searchRequest = "";
    this.pageNumber = 1;
    this.cardsNumber = 40;
  }

  getPhotos = () => {
    const PIXABAY_KEY = "29078045-8c2db167d821a84d590b709ce"
    const result = axios.get(
      `https://pixabay.com/api`,
      {
        params: {
          key: PIXABAY_KEY,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          q: this.searchRequest,
          page: this.pageNumber,
          per_page: this.cardsNumber,
        }
      }
    );
    return result.then((res) => {
      this.pageNumber++;
      return res;
    });
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