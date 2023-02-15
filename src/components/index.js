import {submitPostForm} from './card.js'
import {enableValidation} from './validate.js'
import {closePopup} from "./utils";
import {avatarPopup, editPopup} from "./modal";

import '../pages/index.css';
import './api.js'
import {changeAvatar, getEditProfile, getUserInfo} from "./api";

export const submitButtons = document.querySelectorAll('.submit-button');   //не было экспорта

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

getUserInfo()
  .then(res => {
  updateProfile(res.name, res.about)
  updateAvatar(res.avatar)
}).catch((error) => {
  console.log(error);
})


const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', submitPostForm);



function submitProfileForm(e) {
  e.preventDefault();
  changeTextOnSubmitButton(true);
  if (fio.length < 1 || profession.length < 1) return;

  profileTitle.textContent = fio.value;
  profileSubtitle.textContent = profession.value;

  getEditProfile(fio.value, profession.value)
    .then(res => {
    updateProfile(res.name, res.about);
    changeTextOnSubmitButton(false);
  }).then(closePopup(avatarPopup))
    .then(closePopup(editPopup))
    .catch((error) => {
    console.log(error);
  })

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
    .catch((error) => {
      console.log(error);
    })
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

// //ВАРИАНТ РЕВЬЮЕРА
// // можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
// export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
//   if (isLoading) {
//     button.textContent = loadingText
//   } else {
//     button.textContent = buttonText
//   }
// }

// // можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
// function handleSubmit(request, evt, loadingText = "Сохранение...") {
//  // всегда нужно предотвращать перезагрузку формы при сабмите
//   evt.preventDefault();

//   // универсально получаем кнопку сабмита из `evt`
//   const submitButton = evt.submitter;
//   // записываем начальный текст кнопки до вызова запроса
//   const initialText = submitButton.textContent;
//   // изменяем текст кнопки до вызова запроса
//   renderLoading(true, submitButton, initialText, loadingText);
//   request()
//     .then(() => {
//       // любую форму нужно очищать после успешного ответа от сервера
//       // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
//       evt.target.reset();
//     })
//     .catch((err) => {
//       // в каждом запросе нужно ловить ошибку
//       console.error(`Ошибка: ${err}`);
//     })
//     // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
//     .finally(() => {
//       renderLoading(false, submitButton, initialText);
//     });
// }

// // пример оптимизации обработчика сабмита формы профиля
// function submitProfileForm(evt) {
//   // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
//   function makeRequest() {
//     // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
//     return profileForm(popupName.value, popupProfession.value).then((userData) => {
//       profileName.textContent = userData.name;
//       profileProfession.textContent = userData.about;
//     });
//   }
//   // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
//   handleSubmit(makeRequest, evt);
// }
 