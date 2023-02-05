import {fio, profession, profileSubtitle, profileTitle} from "./index.js";

export const editPopup = document.getElementById('profile-popup'); //попап редактирования профиля
export const addPopup = document.getElementById('element-popup'); //попап добавления поста
export const popupBackground = document.querySelector('.popup_background'); //popup фотографий
export const openPopup = popup => popup.classList.add('popup_opened'); //открытие попапа

export const openPopupProfile = () => {
  editPopup.classList.add('popup_opened');
  fio.value = profileTitle.textContent;
  profession.value = profileSubtitle.textContent;
 }