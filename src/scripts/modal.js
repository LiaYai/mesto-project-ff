export {openPopup, closePopup}

// Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', closeByButton);
  document.addEventListener('click', closePopupOverley);
  document.addEventListener('keydown', closePopupEsc);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOverley);
  document.removeEventListener('keydown', closePopupEsc);
}

// Функция закрытия попапа кликом на кнопку-крестик
function closeByButton(evt) {
  closePopup(evt.target.closest('.popup'));
}

// Функция закрытия попапа кликом на оверлей
function closePopupOverley(evt) {
  const popup = evt.target.closest('.popup');
  if (popup && evt.target.classList.contains('popup_is-opened')) 
    closePopup(popup);
}

// Функция закрытия попапа нажатием Esc
function closePopupEsc(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape' && activePopup) {
    closePopup(activePopup);
  }
}