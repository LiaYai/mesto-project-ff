import { hideError } from "./validation";

export {openPopup, closePopup}

// Функция для открывания попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('mousedown', closePopupOverley);
  document.addEventListener('keydown', closePopupEsc);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOverley);
  document.removeEventListener('keydown', closePopupEsc);

  // Сомнительно, но пока красивее вариант в голову не пришел
  const form = popup.querySelector('.popup__form');
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  
  inputList.forEach((input) => hideError(form, input));
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