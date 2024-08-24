const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'b215d746-336a-4e03-bc3a-fd6ee9451d58',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
};

export const handleError = (error) => {
  console.log(error);
};

// Загрузка данных пользователя
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Загрузка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

// Отправить обновленные данные пользователя
export const patchProfile = (newProfileName, newProfileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileDescription,
    }),
  }).then(handleResponse);
};

// Добавить новую карточку
export const postNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(handleResponse);
};

// Удалить карточку
export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

// Поставить или убрать лайк
export const changeLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'PUT' : 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

// Отправить новый аватар
export const patchNewAvatar = (newAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  }).then(handleResponse);
};

// Проверка, что в ссылке картинка
export const checkUrl = (newAvatarUrl) => {
  return fetch(`${newAvatarUrl}`, {
    method: 'HEAD',
  });
};
