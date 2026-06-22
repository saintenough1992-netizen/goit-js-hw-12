import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '56128915-3f9b657c3018140957932d29d';

export default function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      return res.data.hits;
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}
