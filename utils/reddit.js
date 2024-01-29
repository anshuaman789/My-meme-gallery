import axios from 'axios';

const REDDIT_URL = 'https://www.reddit.com/r/memes.json';

export const fetchMemes = async (after = '') => {
  try {
    const response = await axios.get(`${REDDIT_URL}?after=${after}`);
    return response.data.data.children;
  } catch (error) {
    console.error('Error fetching memes:', error);
    return [];
  }
};
