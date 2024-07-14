import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, closePopup} from './modal.js';
import '../pages/index.css';

// DOM узлы
const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];
const newPlaceName = addCardForm.elements['place-name'];
const newPlaceLink = addCardForm.elements.link;

// Заполнение галереи карточками
initialCards.forEach((item) => {
  cardList.append(createCard(item.link, item.name,deleteCard, likeCard, openCard));
});

// Плавное открытие попапа
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function() {
  openPopup(profilePopup)
});

// Функция открытия попапа для увеличения картинки
function openCard(link, name) {
  openPopup(cardPopup);
  cardPopup.querySelector('.popup__image').src = link; 
  cardPopup.querySelector('.popup__image').alt = name;
  cardPopup.querySelector('.popup__caption').textContent = name;
}

// Открытие попапа добавления нового места
addCardButton.addEventListener('click', function(evt) {
  openPopup(addCardPopup);
});

// При первом открытии попапа значения в форме редактирования профиля будут заполнены из заголовка и описания
profileForm.elements.name.value = profileName.textContent;
profileForm.elements.description.value = profileDescription.textContent;

// Обработчик «отправки» формы редактирования профиля, хотя пока она никуда отправляться не будет
function profileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileForm.elements.name.value;
    profileDescription.textContent = profileForm.elements.description.value;
    closePopup(evt.target.closest('.popup'));
}

// Клик на сабмит у попапа редактирования профиля
profileForm.addEventListener('submit', profileFormSubmit);

// Функция создания нового места
function addFormSubmit(evt) {
  evt.preventDefault();
  cardList.prepend(createCard (newPlaceLink.value, newPlaceName.value, deleteCard, likeCard, openCard));
  newPlaceLink.value = '';
  newPlaceName.value = '';
  closePopup(evt.target.closest('.popup'));
}

// Клик на сабмит у попапа добавления нового места
addCardForm.addEventListener('submit', addFormSubmit);

