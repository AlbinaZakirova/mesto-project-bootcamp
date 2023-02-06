import {fio, profession, profileSubtitle, profileTitle} from "./index.js";

export const editPopup = document.getElementById('profile-popup'); //попап редактирования профиля
export const addPopup = document.getElementById('element-popup'); //попап добавления поста
export const popupBackground = document.querySelector('.popup_background'); //popup фотографий


export const openPopupProfile = popup => {
  openPopup(popup)
  fio.value = profileTitle.textContent;
  profession.value = profileSubtitle.textContent;
}