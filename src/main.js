import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
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

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

hideLoadMoreButton();

async function onSubmit(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  hideEndMessage();

  if (searchQuery === '') {
    iziToast.error({
      message: 'Search cannot be empty!',
      position: 'topLeft',
    });
    return;
  }

  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topLeft',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();
      showEndMessage();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topLeft',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

async function onLoadMore() {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    createGallery(data.hits);

    scrollPage();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();
      showEndMessage();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topLeft',
    });
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
