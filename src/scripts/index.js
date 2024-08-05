import {createCard, deleteCard, likeCard, openCard} from './card.js';
import {openPopup, closePopup} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getProfileInfo } from './api.js';
import '../pages/index.css';

// DOM узлы
const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const addCardForm = document.forms['new-place'];
const newPlaceName = addCardForm.elements['place-name'];
const newPlaceLink = addCardForm.elements.link;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;

// Плавное открытие попапа
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

Promise.all([getProfileInfo(), getInitialCards()])
    // Заполнение данными профиля 
    .then(([data, arr]) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      userId = data._id;
    // Заполнение галереи карточками
      arr.forEach((item) => {
        cardList.append(createCard(item.link, item.name, deleteCard, likeCard, openCard));
      })
    })
    .catch((err) => {
      console.log(err);
    });

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function() {
  openPopup(profilePopup);
  clearValidation(profileForm, validationConfig);
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
});

// Открытие попапа добавления нового места
addCardButton.addEventListener('click', function(evt) {
  openPopup(addCardPopup);
  clearValidation(addCardForm, validationConfig);
  addCardForm.reset();
});

// Навешиваем на все кнопки закрытия попапа слушатель 
closeButtons.forEach((button) => 
  button.addEventListener('click',() => closePopup(button.closest('.popup')))
);

// Обработчик «отправки» формы редактирования профиля, хотя пока она никуда отправляться не будет
function profileFormSubmit() {
    profileName.textContent = profileForm.elements.name.value;
    profileDescription.textContent = profileForm.elements.description.value;
    closePopup(profilePopup);
}

// Клик на сабмит у попапа редактирования профиля
profileForm.addEventListener('submit', profileFormSubmit);

// Функция создания нового места
function addFormSubmit(evt) {
  cardList.prepend(createCard (newPlaceLink.value, newPlaceName.value, deleteCard, likeCard, openCard));
  closePopup(addCardPopup);
}

// Клик на сабмит у попапа добавления нового места
addCardForm.addEventListener('submit', addFormSubmit);

enableValidation(validationConfig);