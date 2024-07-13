import {initialCards} from './cards.js'
import '../pages/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardTemplateItem = cardTemplate.querySelector('.card');
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, delCard) {
  const cardItem = cardTemplateItem.cloneNode(true);
  
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__image').alt = card.name;
  cardItem.querySelector('.card__title').textContent = card.name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardItem));
  
  return cardItem;
};

//@todo: Функция удаления карточки  
function deleteCard (item) {
  item.remove();
}; 

initialCards.forEach((item) => {
  cardList.append(createCard(item,deleteCard));
});


//ПР-6
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const places = document.querySelector('.places');
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');

//Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

//Функция для закрытия попапа
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_is-opened');
}

//Открытие попапа для редактирования профиля
editProfileButton.addEventListener('click', function() {
  openPopup(profilePopup)
});

//Открытие попапа для добавления нового места
addCardButton.addEventListener('click', function() {
  openPopup(addCardPopup)
});

//Открытие попапа для приближение картинки для каждого места
places.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(cardPopup);
    cardPopup.querySelector('.popup__image').src = evt.target.src; 
    cardPopup.querySelector('.popup__image').alt = evt.target.alt;
    cardPopup.querySelector('.popup__caption').textContent = evt.target.alt;
  }
})

//Навесила слушатель на кнопку закрытия для каждого попапа
closeButtons.forEach((item) => {
  item.addEventListener('click', closePopup)
})

//Закрыть попап кликом на оверлей
document.addEventListener('click', function(evt) {
  const popup = evt.target.closest('.popup');
  if (popup && evt.target.classList.contains('popup_is-opened')) 
    closePopup(evt);
})

//Закрыть попап нажатием Esc
document.addEventListener('keydown', function(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape' && activePopup) {
    activePopup.classList.remove('popup_is-opened');
  }
});
