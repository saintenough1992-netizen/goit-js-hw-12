import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = document.querySelector('.gallery');
let loader = document.querySelector('.loader');

export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('is-hidden');
}
export function hideLoader() {
  loader.classList.add('is-hidden');
}
let newGallery = new SimpleLightbox('.gallery a', {
  captionsDelay: 250,
  captionsData: 'title',
});

export function createGallery(images) {
  const markup = images
    .map(
      img =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
         <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" title="${img.tags}" />
        </a>
        <div class="info">
         <p class="info-item"> <b>Likes</b> ${img.likes} </p>
         <p class="info-item"> <b>Views</b> ${img.views} </p>
         <p class="info-item"> <b>Comments</b> ${img.comments} </p>
         <p class="info-item"> <b>Downloads</b> ${img.downloads} </p>
        </div>
        </li>`
    )
    .join('');

  gallery.innerHTML = markup;

  newGallery.refresh();
}
