import {initialCards} from './cards.js'
import '../pages/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardTemplateItem = cardTemplate.querySelector('.card');
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
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

//@todo: Функция удаления карточки  
function deleteCard (item) {
  item.remove();
}; 

initialCards.forEach((item) => {
  cardList.append(createCard(item.link, item.name,deleteCard, likeCard, openCard));
});


//ПР-6
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');

//Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

//Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
}

//Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', function() {
  openPopup(profilePopup)
});

//Функция открытия попапа для увеличения картинки
function openCard(link, name) {
  openPopup(cardPopup);
  cardPopup.querySelector('.popup__image').src = link; 
  cardPopup.querySelector('.popup__image').alt = name;
  cardPopup.querySelector('.popup__caption').textContent = name;
}

//Навесила слушатель на кнопку закрытия для каждого попапа
closeButtons.forEach((item) => {
  item.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'))
  })
})

//Закрыть попап кликом на оверлей
document.addEventListener('click', function(evt) {
  const popup = evt.target.closest('.popup');
  if (popup && evt.target.classList.contains('popup_is-opened')) 
    closePopup(popup);
})

//Закрыть попап нажатием Esc
document.addEventListener('keydown', function(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape' && activePopup) {
    closePopup(activePopup);
  }
});

//Шаг 4
const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//При первом открытии попапа значения в форме будут заполнены из заголовка и описания
profileForm.elements.name.value = profileName.textContent;
profileForm.elements.description.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function profileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileForm.elements.name.value;
    profileDescription.textContent = profileForm.elements.description.value;
    closePopup(evt.target.closest('.popup'));
}

profileForm.addEventListener('submit', profileFormSubmit);

//Шаг 6

const addCardForm = document.forms['new-place'];
const newPlaceName = addCardForm.elements['place-name'];
const newPlaceLink = addCardForm.elements.link;

//Открытие попапа добавления нового места
addCardButton.addEventListener('click', function(evt) {
  openPopup(addCardPopup);
});

//Функция создания нового места
function addFormSubmit(evt) {
  evt.preventDefault();
  cardList.prepend(createCard (newPlaceLink.value, newPlaceName.value, deleteCard, likeCard, openCard));
  newPlaceLink.value = '';
  newPlaceName.value = '';
  closePopup(evt.target.closest('.popup'));
}

addCardForm.addEventListener('submit', addFormSubmit);

//Шаг 7

function likeCard(item) {
  item.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}