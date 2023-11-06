import axios from 'axios';

const BASE_URL = (axios.defaults.baseURL = 'https://api.thecatapi.com/v1');
const API_KEY = (axios.defaults.headers.common['x-api-key'] =
  'live_WmgjtQVEG809mpyqSh5AJ3EXZ1VHqyMZbvJRkP4ZGcIdSDMbCSoG24bXVcaaYQeL');

async function fetchBreeds() {
  const response = await axios.get(`${BASE_URL}/breeds?key=${API_KEY}`);
  return response.data;
}

async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    `${BASE_URL}/images/search?key=${API_KEY}&breed_ids=${breedId}`
  );
  return response.data;
}

export { fetchBreeds, fetchCatByBreed };
