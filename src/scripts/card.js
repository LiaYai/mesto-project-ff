export { createCard };

const getTemplate = () => {
  return document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);
};

// Обработчик создания карточки
function createCard(card, myId, { openDelPopup, doLike, open }) {
  const cardItem = getTemplate();
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

  if (openDelPopup && myId === card.owner._id) {
    deleteButton.addEventListener('click', () =>
      openDelPopup(card._id, cardItem)
    );
  } else {
    deleteButton.remove();
  }

  // Есть ли мой лайк
  const isLiked = () => card.likes.some((like) => like._id === myId);

  // Если мой лайк есть, то сердечко закрашивает
  if (isLiked()) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (doLike) {
    likeButton.addEventListener('click', () =>
      doLike(card._id, likeButton, likeCounter)
    );
  }

  if (open) {
    cardImage.addEventListener('click', () => open(card));
  }

  return cardItem;
}
