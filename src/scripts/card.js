export {createCard, deleteCard, likeCard}

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardTemplateItem = cardTemplate.querySelector('.card');

// Функция создания карточки
function createCard (link, name, delCard, like, open) {
  const cardItem = cardTemplateItem.cloneNode(true);
  
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__image').alt = name;
  cardItem.querySelector('.card__title').textContent = name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardItem));
  cardItem.querySelector('.card__like-button').addEventListener('click', () => like(cardItem));
  cardItem.querySelector('.card__image').addEventListener('click', () => open(link, name));

  return cardItem;
};

// Функция удаления карточки  
function deleteCard (item) {
  item.remove();
}; 

// Функция лайка
function likeCard(item) {
  item.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}