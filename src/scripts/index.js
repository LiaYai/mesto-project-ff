import { createCard, openDeletePopup, likeCard, openCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getProfileInfo, patchProfile, postNewCard, handleError, patchNewAvatar, checkUrl } from './api.js';
import '../pages/index.css';

// DOM узлы
const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
//const changeAvatarButton = document.querySelector('.profile__image');

const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const addCardForm = document.forms['new-place'];
const newPlaceName = addCardForm.elements['place-name'];
const newPlaceLink = addCardForm.elements.link;

const newAvatarForm = document.forms['new-avatar'];
const newAvatarUrl = newAvatarForm.elements['avatar-url'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Плавное открытие попапа
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

Promise.all([getProfileInfo(), getInitialCards()])

    // Заполнение данными профиля 
    .then(([data, arr]) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      const myId = data._id;

    // Заполнение галереи карточками
      arr.forEach((item) => {
        cardList.append(createCard(item, myId, openDeletePopup, likeCard, openCard));
      })
    })
    .catch(handleError);

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

// Обработчик отправки формы редактирования профиля
function profileFormSubmit() {
  const newName = profileForm.elements.name.value; 
  const newAbout = profileForm.elements.description.value;

  patchProfile(newName, newAbout)
    .then((newData) => {
      profileName.textContent = newData.name;
      profileDescription.textContent = newData.about;
    })
    .catch(handleError);

  closePopup(profilePopup);
}

// Клик на сабмит у попапа редактирования профиля
profileForm.addEventListener('submit', profileFormSubmit);

// Функция создания нового места
function addFormSubmit() {
  postNewCard(newPlaceName.value,newPlaceLink.value)
  .then((data) => {
    cardList.prepend(createCard (data, data.owner._id, openDeletePopup, likeCard, openCard));
    closePopup(addCardPopup);
  })
  .catch(handleError);
}

// Клик на сабмит у попапа добавления нового места
addCardForm.addEventListener('submit', addFormSubmit);

enableValidation(validationConfig);

// Открытие попапа для смены аватара
profileImage.addEventListener('click', function(evt) {
  openPopup(newAvatarPopup);
  clearValidation(newAvatarForm, validationConfig);
  newAvatarForm.reset();
});

// Обработчик формы замены аватара
function changeAvatar() {
  checkUrl(newAvatarUrl.value)
  .then((res) => {
    console.log(res.headers.get('content-type'), res.status);
  })
  .catch(handleError);
  patchNewAvatar(newAvatarUrl.value)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    closePopup(newAvatarPopup);
  })
  .catch(handleError);
};

// Клик на сабмит у попапа смены аватара
newAvatarForm.addEventListener('submit', changeAvatar);