import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';

import { getSignedUrl } from './aws';

const getAccessToken = () =>
  bridge
    .send('VKWebAppStorageGet', {
      keys: ['userToken'],
    })
    .then(({ keys = [] }) => {
      const { userToken } = keys.reduce((memo, { key, value }) => {
        const buf = memo;
        buf[key] = value && JSON.parse(value);

        return buf;
      }, {});

      return userToken;
    });

async function requestInterceptor(config) {
  const newConfig = config;
  const accessToken = await getAccessToken();

  if (accessToken) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return newConfig;
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(requestInterceptor);

const API = {
  login: body => apiClient.post('/user', body),
  getUser: () => apiClient.get('/user'),
  getSong: () =>
    apiClient.get('/user/song').then(({ data }) => ({
      ...data,
      url: getSignedUrl(data.url),
    })),
  resetData: () => apiClient.delete('/user'),
  // loadSong: url => axios.get(url, { responseType: 'blob' }),
  getUserById: id => apiClient.get(`/user/${id}`),
  getImageStory: () =>
    apiClient.get('/user/share/story', { responseType: 'blob' }),
  getImageWall: url =>
    apiClient.get('/user/share/track', {
      params: {
        url,
      },
    }),
  uploadWallImage: (url, body) =>
    axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default API;
