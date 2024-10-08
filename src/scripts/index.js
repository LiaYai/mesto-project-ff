import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getInitialCards,
  getProfileInfo,
  patchProfile,
  postNewCard,
  handleError,
  patchNewAvatar,
  checkUrl,
  changeLike,
  removeCard,
} from './api.js';
import '../pages/index.css';

const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');
const cardPopup = document.querySelector('.popup_type_image');
const popupImage = cardPopup.querySelector('.popup__image');
const popupCaption = cardPopup.querySelector('.popup__caption');
const deletePopup = document.querySelector('.popup_type_del-card');

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const deleteForm = document.forms['delete-place'];
const deletePopupButton = deleteForm.elements['delete-button'];
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
  errorClass: 'popup__error_visible',
};

// Плавное открытие попапа
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

// Навешиваем на все кнопки закрытия попапа слушатель
closeButtons.forEach((button) =>
  button.addEventListener('click', () => closePopup(button.closest('.popup')))
);

// Сообщение о загрузке у кнопки 'submit'
function renderLoading(isLoading, popup) {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Обработчик открытия попапа удаления карточки
function openDeletePopup(card_id, cardItem) {
  openPopup(deletePopup);
  deletePopupButton.onclick = function () {
    removeCard(card_id)
      .then(() => {
        cardItem.remove();
        closePopup(deletePopup);
      })
      .catch(handleError);
  };
}

// Обработчик лайка
function likeCard(cardId, likeButton, likeCounter) {
  const isLike = likeButton.classList.contains('card__like-button_is-active');
  changeLike(cardId, !isLike)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(handleError);
}

// Обработчик открытия попапа для увеличения картинки
function openCard(card) {
  openPopup(cardPopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

Promise.all([getProfileInfo(), getInitialCards()])

  .then(([userData, cards]) => {
    // Заполнение данными профиля
    const myId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    // Заполнение галереи карточками
    cards.forEach((item) => {
      cardList.append(
        createCard(item, myId, {
          openDelPopup: openDeletePopup,
          doLike: likeCard,
          open: openCard,
        })
      );
    });
  })
  .catch(handleError);

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  clearValidation(profileForm, validationConfig);
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
});

// Открытие попапа добавления нового места
addCardButton.addEventListener('click', function (evt) {
  openPopup(addCardPopup);
  clearValidation(addCardForm, validationConfig);
  addCardForm.reset();
});

// Обработчик отправки формы редактирования профиля
function postProfileInfo() {
  const newName = profileForm.elements.name.value;
  const newAbout = profileForm.elements.description.value;

  renderLoading(true, profileForm);
  patchProfile(newName, newAbout)
    .then((newData) => {
      profileName.textContent = newData.name;
      profileDescription.textContent = newData.about;
      closePopup(profilePopup);
    })
    .catch(handleError)
    .finally(() => renderLoading(false, profileForm));
}

// Клик на сабмит у попапа редактирования профиля
profileForm.addEventListener('submit', postProfileInfo);

// Обработчик создания нового места
function addFormSubmit() {
  renderLoading(true, addCardForm);
  postNewCard(newPlaceName.value, newPlaceLink.value)
    .then((data) => {
      cardList.prepend(
        createCard(data, data.owner._id, {
          openDelPopup: openDeletePopup,
          doLike: likeCard,
          open: openCard,
        })
      );
      closePopup(addCardPopup);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
    })
    .catch(handleError)
    .finally(() => renderLoading(false, addCardForm));
}

// Клик на сабмит у попапа добавления нового места
addCardForm.addEventListener('submit', addFormSubmit);

// Валидация всех форм в документе
enableValidation(validationConfig);

// Открытие попапа для смены аватара
profileImage.addEventListener('click', function () {
  openPopup(newAvatarPopup);
  clearValidation(newAvatarForm, validationConfig);
  newAvatarForm.reset();
});

// Обработчик формы замены аватара
function changeAvatar() {
  renderLoading(true, newAvatarForm);
  checkUrl(newAvatarUrl.value)
    .then((res) => {
      console.log(res.headers.get('content-type'), res.status);
      if (
        res.headers.get('content-type').startsWith('image/') &&
        res.status === 200
      ) {
        patchNewAvatar(newAvatarUrl.value)
          .then((data) => {
            closePopup(newAvatarPopup);
            profileImage.style.backgroundImage = `url(${data.avatar})`;
          })
          .catch(handleError)
          .finally(() => renderLoading(false, newAvatarForm));
      }
    })
    .catch(handleError);
}

// Клик на сабмит у попапа смены аватара
newAvatarForm.addEventListener('submit', changeAvatar);
