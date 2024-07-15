export {openPopup, closePopup}

// Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOverley);
  document.addEventListener('keydown', closePopupEsc);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOverley);
  document.removeEventListener('keydown', closePopupEsc);
}

// Функция закрытия попапа кликом на оверлей
function closePopupOverley(evt) {
  if (evt.target.classList.contains('popup_is-opened')) 
    closePopup(evt.target);
}

// Функция закрытия попапа нажатием Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
}