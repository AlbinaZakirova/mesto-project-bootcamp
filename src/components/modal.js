export {handleClosePopup, closePopupOverlay, closePopupEsc }

export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
export const buttonOpenAddPopup = document.querySelector('.profile__add-button'); //кнопки открытия попапа добавления поста

export const closePopup = popup => {
  popup.classList.remove('popup_opened');
  popup.querySelector('.form').reset();
}  //закрытие попапа
import {editPopup, addPopup, popupBackground, openPopup, openPopupProfile} from './utils.js'



//Функция закрытия попапов по кнопке/
function handleClosePopup(e, modal ) {    
  const target = e.target;
  if (target.classList.contains('popup') || target.classList.contains('close')) {
    closePopup(modal)
  }
}

editPopup.addEventListener('click', (e) => handleClosePopup(e,editPopup));
addPopup.addEventListener('click', (e) => handleClosePopup(e,addPopup));
popupBackground.addEventListener('click', (e) => handleClosePopup(e,popupBackground));



//функция закрытия попапа через Overlay 
function closePopupOverlay (e, popup) {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}
 
document.addEventListener('click', e => closePopupOverlay(e, editPopup));
document.addEventListener('click', e => closePopupOverlay(e, addPopup)); 
document.addEventListener('click', e => closePopupOverlay(e, popupBackground)); 



//функция  закрытия попапа через Esc 
function closePopupEsc (e, popup) {
  if (e === 'Escape') {
    closePopup(popup);
  }
}

document.addEventListener('keydown', e => closePopupEsc(e.key, editPopup));
document.addEventListener('keydown', e => closePopupEsc(e.key, addPopup)); 
document.addEventListener('keydown', e => closePopupEsc(e.key, popupBackground)); 

buttonOpenPopupProfile.addEventListener('click', () => openPopupProfile())
buttonOpenAddPopup.addEventListener('click', () => openPopup(addPopup))