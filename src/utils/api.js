import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';

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
  baseURL: 'https://sheltered-earth-69434.herokuapp.com/api/',
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(requestInterceptor);

const API = {
  login: body => apiClient.post('/user', body),
  getUser: () => apiClient.get('/user'),
  getSong: () => apiClient.get('/user/song'),
  loadSong: url => axios.get(url, { responseType: 'blob' }),
  getUserById: id => apiClient.get(`/user/${id}`),
};

export default API;
