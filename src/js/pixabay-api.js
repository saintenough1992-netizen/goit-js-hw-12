import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '56128915-3f9b657c3018140957932d29d';
const PER_PAGE = 15;

export default async function getImagesByQuery(query, page) {
  const res = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return res.data;
}
