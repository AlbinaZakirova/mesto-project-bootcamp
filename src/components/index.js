import '../pages/index.css';
import './constants.js'
import './form.js'
import './api.js'

import {enableValidation} from './validate.js'
import {updateAvatar, updateProfile} from "./utils";
import {getAllInform} from "./api";
import {addNewPost} from "./card";
export let userID = null;

//выводим карточки и информацию о профиле
export function renderInitialCards() {
  getAllInform()
    .then(([dataCards, dataUser]) => {

      userID = dataUser._id;
      dataCards.reverse().forEach(addNewPost);

      updateProfile(dataUser.name, dataUser.about);
      updateAvatar(dataUser.avatar);
    })
    .catch((error) => {
      console.log(error);
    })
}
renderInitialCards();

const configSelector = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__input_state_invalid'
}

enableValidation(configSelector);