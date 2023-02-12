import {submitPostForm} from './card.js'
import {enableValidation} from './validate.js'
import {closePopup} from "./utils";
import {avatarPopup, editPopup} from "./modal";

import '../pages/index.css';
import './api.js'
import {changeAvatar, getEditProfile, getUserInfo} from "./api";

const submitButtons = document.querySelectorAll('.submit-button');

export const changeTextOnSubmitButton = isLoading => {
  submitButtons.forEach(button =>
    button.textContent = isLoading ? 'Сохранение...' : "Создать"
  )
}

//обработчик отправки формы редактирования профиля
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const fio = document.querySelector('.form__input_name_fio');
export const profession = document.querySelector('.form__input_name_profession');

const avatar = document.querySelector('.profile__avatar');

const updateProfile = (fio, profession) => {
  profileTitle.textContent = fio;
  profileSubtitle.textContent = profession;
}

const updateAvatar = link => avatar.src = link;

getUserInfo().then(res => {
  updateProfile(res.name, res.about);
  updateAvatar(res.avatar);
});


const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', submitPostForm);

function submitProfileForm(e) {
  e.preventDefault();
  changeTextOnSubmitButton(true);
  if (fio.length < 1 || profession.length < 1) return;

  profileTitle.textContent = fio.value;
  profileSubtitle.textContent = profession.value;

  getEditProfile(fio.value, profession.value).then(res => {
    updateProfile(res.name, res.about);
    changeTextOnSubmitButton(false);
  }).then(closePopup(avatarPopup))

  closePopup(editPopup);
}


//форма редактирования профиля 
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', submitProfileForm);


const avatarForm = document.getElementById('avatar-form');

function submitAvatarForm(e) {
  e.preventDefault();
  changeTextOnSubmitButton(true);

  const avatarLink = avatarForm.querySelector('.form__input_link_photo').value;
  changeAvatar(avatarLink)
    .then(res => {
      updateAvatar(res.avatar);
      changeTextOnSubmitButton(false);
    }).then(closePopup(avatarPopup))
}

avatarForm.addEventListener('submit', submitAvatarForm);


const configSelector = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_state_invalid'
}

enableValidation(configSelector);

