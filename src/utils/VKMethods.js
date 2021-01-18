import bridge from '@vkontakte/vk-bridge';

export const getToken = (appId, scopes = []) =>
  bridge
    .send('VKWebAppGetAuthToken', {
      app_id: appId,
      scope: scopes.join(','),
    })
    .then(({ access_token: accessToken }) => accessToken);

export const getUserInfo = (userId, token) =>
  bridge
    .send('VKWebAppCallAPIMethod', {
      method: 'users.get',
      params: {
        v: '5.126',
        access_token: token,
        user_ids: userId,
        name_case: 'gen',
      },
    })
    .then(({ response: [data] }) => ({
      firstNameGen: data.first_name,
      lastNameGen: data.last_name,
    }));
