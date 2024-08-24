export { openPopup, closePopup };

// Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('mousedown', closePopupOverley);
  document.addEventListener('keyup', closePopupEsc);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('mousedown', closePopupOverley);
  document.removeEventListener('keyup', closePopupEsc);
}

// Функция закрытия попапа кликом на оверлей
function closePopupOverley(evt) {
  if (evt.target.classList.contains('popup_is-opened')) closePopup(evt.target);
}

// Функция закрытия попапа нажатием Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
}
