import '../pages/index.css';
import './constants.js'
import './form.js'
import './api.js'

import {enableValidation} from './validate.js'
import {renderInitialCards, updateAvatar, updateProfile} from "./utils";
import {getUserInfo} from "./api";

//выводим информацию о профиле
getUserInfo()
  .then(res => {
    updateProfile(res.name, res.about)
    updateAvatar(res.avatar)
  }).catch((error) => {
  console.log(error);
});

//выводим карточки
renderInitialCards();

const configSelector = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_state_invalid'
}

enableValidation(configSelector);