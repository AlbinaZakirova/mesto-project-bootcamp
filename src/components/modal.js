import {
  addPopup,
  avatarPopup,
  buttonOpenAddPopup,
  buttonOpenAvatarPopup,
  buttonOpenPopupProfile,
  editPopup, fio,
  imagePopup, profession, profileSubtitle, profileTitle
} from "./constants";

export {closePopupOverlay, closePopupEsc}

//Функция открытия попапов 
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Функция закрытие попапов
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

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

// обработчики на кнопки закрытия попапов
editPopup.addEventListener('click', (e) => handleClosePopup(e, editPopup));
addPopup.addEventListener('click', (e) => handleClosePopup(e, addPopup));
imagePopup.addEventListener('click', (e) => handleClosePopup(e, imagePopup));
avatarPopup.addEventListener('click', (e) => handleClosePopup(e, avatarPopup));


// обработчики на overlay закрытия попапов
document.addEventListener('click', e => closePopupOverlay(e, editPopup));
document.addEventListener('click', e => closePopupOverlay(e, addPopup));
document.addEventListener('click', e => closePopupOverlay(e, imagePopup));
document.addEventListener('click', e => closePopupOverlay(e, avatarPopup));


// обработчики открытия попапов
buttonOpenPopupProfile.addEventListener('click', () => openPopupProfile(editPopup))
buttonOpenAddPopup.addEventListener('click', () => openPopup(addPopup))
buttonOpenAvatarPopup.addEventListener('click',() => openPopup(avatarPopup))