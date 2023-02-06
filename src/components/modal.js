import {fio, profession, profileSubtitle, profileTitle} from "./index";
import {closePopup, openPopup} from './utils.js'

export const editPopup = document.getElementById('profile-popup'); //попап редактирования профиля
export const addPopup = document.getElementById('element-popup'); //попап добавления поста
export const popupBackground = document.querySelector('.popup_background'); //popup фотографий

export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
export const buttonOpenAddPopup = document.querySelector('.profile__add-button'); //кнопка открытия попапа добавления поста

export {closePopupOverlay, closePopupEsc}

//Функция закрытия попапов по кнопке
function handleClosePopup(e, modal) {
  const target = e.target;
  if (target.classList.contains('close')) {
    closePopup(modal);
  }
}

//функция  закрытия попапа через Esc
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//функция закрытия попапа через Overlay
function closePopupOverlay(e, modal) {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(modal);
  }
}

export const openPopupProfile = popup => {
  openPopup(popup)
  fio.value = profileTitle.textContent;
  profession.value = profileSubtitle.textContent;
}

editPopup.addEventListener('click', (e) => handleClosePopup(e, editPopup));
addPopup.addEventListener('click', (e) => handleClosePopup(e, addPopup));
popupBackground.addEventListener('click', (e) => handleClosePopup(e, popupBackground));


document.addEventListener('click', e => closePopupOverlay(e, editPopup));
document.addEventListener('click', e => closePopupOverlay(e, addPopup));
document.addEventListener('click', e => closePopupOverlay(e, popupBackground));


buttonOpenPopupProfile.addEventListener('click', () => openPopupProfile(editPopup))
buttonOpenAddPopup.addEventListener('click', () => openPopup(addPopup))
