import axios from "axios";

export default class PhotoService {

  static PIXABAY_KEY = "29078045-8c2db167d821a84d590b709ce";

  constructor() {
    this.searchRequest = "";
    this.pageNumber = 1;
    this.cardsNumber = 40;
  }

  getPhotos = async () => {
    const response = await axios.get(
      `https://pixabay.com/api`,
      {
        params: {
          key: PhotoService.PIXABAY_KEY,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          q: this.searchRequest,
          page: this.pageNumber,
          per_page: this.cardsNumber,
        }
      }
    );
    this.pageNumber++;

    return response;
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