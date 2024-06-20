const cardList = document.querySelector('.places__list');

function addCard (card, delCard) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;

  // @todo: DOM узлы
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  // @todo: Функция создания карточки
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__title').textContent = card.name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardItem));
  
  return cardItem;
};

//@todo: Функция удаления карточки  
function deleteCard (item) {
  item.remove();
}; 

initialCards.forEach((item) => {
  cardList.append(addCard(item,deleteCard));
});