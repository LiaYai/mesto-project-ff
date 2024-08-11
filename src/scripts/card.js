export { createCard };

const cardTemplate = document.querySelector('#card-template').content;

const cardTemplateItem = cardTemplate.querySelector('.card');

// Обработчик создания карточки
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
