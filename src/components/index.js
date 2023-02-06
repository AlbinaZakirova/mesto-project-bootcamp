import {submitPostForm } from './card.js'
import {enableValidation} from './validate.js'
import {editPopup} from './utils.js'
import {closePopup} from './modal.js'

import '../pages/index.css';
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', submitPostForm);

//обработчик отправки формы редактирования профиля
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const fio = document.querySelector('.form__input_name_fio');
export const profession = document.querySelector('.form__input_name_profession');

function submitProfileForm(e) {
  e.preventDefault();
  if (fio.length < 1 || profession.length < 1) return;

  profileTitle.textContent = fio.value;
  profileSubtitle.textContent = profession.value;

  closePopup(editPopup);
}

//форма редактирования профиля 
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', submitProfileForm);


const configSelector = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_state_invalid'
}

enableValidation(configSelector);
