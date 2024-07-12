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
const editButton = document.querySelector('.profile__edit-button');
const popapProfile = document.querySelector('.popup_type_edit');
const closePopapButton = popapProfile.querySelector('.popup__close');

//Функция открытия попапа
function openPopap() {
  popapProfile.classList.add('popup_is-opened');
} 

//Функция закрытия попапа
function closePopap() {
  popapProfile.classList.remove('popup_is-opened');
}

//Открытие попапа для редактирования профиля
editButton.addEventListener('click', openPopap);
closePopapButton.addEventListener('click', closePopap);