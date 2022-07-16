import axios from 'axios';

const API_KEY = '28599383-28206a1b3fc5a66896effd792';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const api = async (name, page) => {
  const res = await axios.get(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const totalImage = res.data.totalHits;
  const images = res.data.hits;
  return {
    totalImage,
    images,
  };
};
