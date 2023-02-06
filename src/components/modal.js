export {handleClosePopup, closePopupOverlay /*closePopupEsc*/ }
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
export const buttonOpenAddPopup = document.querySelector('.profile__add-button'); //кнопка открытия попапа добавления поста


import {editPopup, addPopup, popupBackground, openPopupProfile} from './utils.js'

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

//функция  закрытия попапа через Esc 
function closePopupEsc (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция закрытия попапов по кнопке
function handleClosePopup(e, modal) {   
  e.preventDefault(); 
  const target = e.target;
  if (target.classList.contains('popup') || target.classList.contains('close')) {
    closePopup(modal);
  }
}

editPopup.addEventListener('click', (e) => handleClosePopup(e,editPopup));
addPopup.addEventListener('click', (e) => handleClosePopup(e,addPopup));
popupBackground.addEventListener('click', (e) => handleClosePopup(e,popupBackground));


//функция закрытия попапа через Overlay 
function closePopupOverlay (e, modal) {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(modal);
  }
}
 
document.addEventListener('click', e => closePopupOverlay(e, editPopup));
document.addEventListener('click', e => closePopupOverlay(e, addPopup)); 
document.addEventListener('click', e => closePopupOverlay(e, popupBackground)); 





buttonOpenPopupProfile.addEventListener('click', () => openPopupProfile(editPopup))
buttonOpenAddPopup.addEventListener('click', () => openPopup(addPopup))

