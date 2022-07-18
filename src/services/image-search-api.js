import axios from 'axios';
import { API_KEY, BASE_URL } from 'constans/apiConstans';

export const api = async (name, page) => {
  const res = await axios.get(BASE_URL, {
    params: {
      q: name,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  const totalImage = res.data.totalHits;
  const images = res.data.hits;
  return {
    totalImage,
    images,
  };
};
