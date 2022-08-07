import FetchPhotos from "./fetchPhotos.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchQueryForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-form > input");
const galleryPart = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");
loadMoreButton.style.display = "none";

const fetchMaker = new FetchPhotos();

searchQueryForm.addEventListener("submit", onSubmit);
loadMoreButton.addEventListener("click", fetchArticles);

function onSubmit(event) {
  event.preventDefault();
  galleryPart.innerHTML = "";
  loadMoreButton.style.display = "none";
  fetchMaker.resetPage();
  fetchMaker.request = searchInput.value;
  fetchArticles();
  event.currentTarget.reset();
}

function fetchArticles() {
  fetchMaker.newFetch().then(res => cardBuilder(res.data));
}

function cardBuilder(photoSet) {
  photosCounter(photoSet);
  let galleryToInput = "";
  photoSet.hits.forEach(photo => {
    galleryToInput = galleryToInput + `
    <div class="photo-card">
      <div class="photo-frame">
        <a href="${photo.largeImageURL}" class="gallery__link">
          <img src="${photo.webformatURL}" alt="" loading="lazy" class="gallery__image" />    
        </a>
      </div>
      <div class="info">
        <p class="info-item"><b>Likes</b><br>${photo.likes}</p>
        <p class="info-item"><b>Views</b><br>${photo.views}</p>
        <p class="info-item"><b>Comments</b><br>${photo.comments}</p>
        <p class="info-item"><b>Downloads</b><br>${photo.downloads}</p>
      </div>
    </div>`
  });
  galleryPart.innerHTML += galleryToInput;
  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  gallery.refresh();

  if (fetchMaker.pageNumber === 2) {
    window.scrollBy({
      top: 0,
    });
  } else if (fetchMaker.pageNumber > 2) {
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
}

function photosCounter(initialData) {
  const totalHits = initialData.totalHits;
  const currentPage = fetchMaker.pageNumber - 1;
  const cardsNumber = fetchMaker.cardsNumber;
  const maxPageNumber = totalHits / cardsNumber;

  if (currentPage === 1 && maxPageNumber > 1) {
    loadMoreButton.style.display = "block";
  }
  if (currentPage === 1 && totalHits > 0) {
    Notify.success(`Hooray! We found ${totalHits} images.`)
  } else if (currentPage === 1 && totalHits === 0) {
    loadMoreButton.style.display = "none";
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  if (currentPage >= maxPageNumber && totalHits > cardsNumber) {
    loadMoreButton.style.display = "none";
    Notify.info("We're sorry, but you've reached the end of search results.")
  }
}