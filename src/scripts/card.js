export { createCard, openDeletePopup, likeCard, openCard };
import { closePopup, openPopup } from './modal';
import { removeCard, handleError, putLike, deleteLike } from './api';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardTemplateItem = cardTemplate.querySelector('.card');
const cardPopup = document.querySelector('.popup_type_image');
const deletePopup = document.querySelector('.popup_type_del-card');
const deleteForm = document.forms['delete-place'];

// Функция создания карточки
function createCard(card, myId, openDelPopup, like, open) {
  const cardItem = cardTemplateItem.cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  const likeButton = cardItem.querySelector('.card__like-button');
  const likeCounter = cardItem.querySelector('.card__like-number');

  const deleteButton = cardItem.querySelector('.card__delete-button');

  // Заполняет карточку данными
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  // Если я-создатель карточки, то кнопку удаления не показывает, иначе вешает слушатель для кнопки удаления
  const isMine = myId === card.owner._id;
  if (isMine) {
    deleteButton.addEventListener('click', () => openDelPopup(card, cardItem));
  } else {
    deleteButton.classList.add('card__delete-button_hidden');
  }

  // Есть ли мой лайк
  const myLike = () => {
    return card.likes.some((like) => like._id === myId);
  };
  // Если мой лайк есть, то сердечко закрашивает
  if (myLike()) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () =>
    like(card._id, likeButton, likeCounter)
  );
  cardImage.addEventListener('click', () => open(card));

  return cardItem;
}

// Функция удаления карточки
function deleteCard(card, cardItem) {
  removeCard(card._id)
    .then(() => {
      closePopup(deletePopup);
      cardItem.remove();
    })
    .catch(handleError);
}

// Функция открытия попапа удаления карточки
function openDeletePopup(card, cardItem) {
  openPopup(deletePopup);
  deleteForm.addEventListener('submit', () => {
    deleteCard(card, cardItem);
  });
}

// Функция лайка
function likeCard(cardId, likeButton, likeCounter) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
      })
      .catch(handleError);
  } else {
    putLike(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
      })
      .catch(handleError);
  }
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция открытия попапа для увеличения картинки
function openCard(card) {
  openPopup(cardPopup);
  cardPopup.querySelector('.popup__image').src = card.link;
  cardPopup.querySelector('.popup__image').alt = card.name;
  cardPopup.querySelector('.popup__caption').textContent = card.name;
}
