import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

let searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  clearGallery();

  const input = event.currentTarget.elements[`search-text`].value.trim();

  if (input === '') {
    iziToast.error({
      message: 'Search cannot be empty!',
      position: 'topLeft',
    });
    return;
  }
  showLoader();
  getImagesByQuery(input)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topLeft',
        });
        return;
      }
      createGallery(images);
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later,',
        position: 'topLeft',
      });
      console.log(error);
    })
    .finally(() => {
      hideLoader();
      searchForm.reset();
    });
}
