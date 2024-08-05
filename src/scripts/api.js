
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'b215d746-336a-4e03-bc3a-fd6ee9451d58',
    'Content-Type': 'application/json'
  }
}

// Загрузка данных пользователя
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

//Загрузка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
} 

// const patchEdi
//   fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: 'Marie Skłodowska Curie',
//       about: 'Physicist and Chemist'
//     })
//   });