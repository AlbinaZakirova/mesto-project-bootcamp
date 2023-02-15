import {closePopup, openPopup} from "./utils";
// import {changeTextOnSubmitButton} from "./index";
import {addPopup, imagePopup} from "./modal";
import {addCard, removeCard, getAllInform, setLike} from "./api";
import { submitButtons} from "./index";


const popupPhoto = imagePopup.querySelector('.popup__photo');
const popupTitle = imagePopup.querySelector('.popup__info-title');
let userID = null;

//массив с готовыми постами 
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//добавление нового поста el объект поста {name, link} 
export const elements = document.querySelector('.elements');//секция с постами

//создание карточки и добавление обработчиков 
export const createCard = (data) => {
  const elementTemplate = document.getElementById('element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__info-title').textContent = data.name;
  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = data.link;
  elementPhoto.alt = data.name;


//лайк
  const elementLike = element.querySelector('.element__like');
  const elementHeart = elementLike.querySelector('.element__like-heart');
  const elementCount = elementLike.querySelector('.element__like-count');

  const cardId = data._id;

  const updateLikes = count => elementCount.textContent = count;
  let isLiked = data.likes.some(user => user._id === userID);

  elementLike.addEventListener('click', evt => {
    evt.preventDefault();
    //Было тут, ревьюер сказал перенести в then
    setLike(cardId, isLiked)
      .then(res => {
        elementHeart.classList.toggle('element__like-heart_active'); //я об этой строке, окрашивающей лайк
        isLiked = res.likes.some(user => user._id === userID)
        updateLikes(res.likes.length)
        
      })
      .catch((error) => {
        console.log(error);
      })
  });

  isLiked && elementHeart.classList.add('element__like-heart_active');
  updateLikes(data.likes.length);

//8. Удаление карточки  
  const elementTrash = element.querySelector('.element__trash');
  if (data.owner._id === userID) {
    elementTrash.addEventListener('click', () => {
      removeCard(data._id)
        .then(() => {
          element.remove();
          console.log(`Элемент с ID ${data._id} был успешно удален`)
        })
        .catch((error) => {
          console.log(error);
        })
    });
  } else {
    elementTrash.remove();
  }


//открытие попапа фотографии
  elementPhoto.addEventListener('click', e => {
    e.preventDefault();
    popupPhoto.src = data.link;
    popupPhoto.alt = data.name;
    popupTitle.textContent = data.name;
    openPopup(imagePopup)
  });

  return element;
}

//вставить карточку в разметку 
export const addNewPost = (data) => elements.prepend(createCard(data));

//3. Загрузка информации о пользователе с сервера 
//4. Загрузка карточек с сервера
function renderInitialCards() {
  getAllInform()
    .then(([dataCards, dataUser]) => {
      userID = dataUser._id;
      dataCards.reverse().forEach(addNewPost);
    })
    .catch((error) => {
      console.log(error);
    })
}

renderInitialCards()


export const name = document.querySelector('.form__input_place_name');
export const link = document.querySelector('.form__input_link_photo');


//6. Добавление новой карточки                                      
export function submitPostForm(e) {
  e.preventDefault();
  changeTextOnSubmitButton(true);
  addCard({name: name.value, link: link.value})
    .then(res => {
      addNewPost({name: res.name, link: res.link});
      changeTextOnSubmitButton(false);
    })
    .catch((error) => {
      console.log(error);
    })
  closePopup(addPopup);
}


//ВАРИАНТ С ВЕБИНАРА
// function setButtonText ({button, text, disabled}) {
//   if(!disabled) {
//     button.disabled = false
//   } else {
//     button.disabled = 'disabled'
//   }
//   button.textContent = text;
// };

//  export function submitPostForm(e) {
//    e.preventDefault();
//    setButtonText({
//      button: submitButtons,
//      text: 'Сохраняем...',
//      disabled: true,
//    })
//    addCard({name: name.value, link: link.value})
//      .then(res => {
//        addNewPost({name: res.name, link: res.link});
       
//      })
//      .then(closePopup(addPopup))
//      .catch((error) => {
//        console.log(error);
//      })
//      .finally (() => {
//        setButtonText({
//          button: submitButtons,
//          text: 'Создать',
//          disabled: false,
//        })
//      })
     
//  }

 

//А ЭТО НАПИСАЛ РЕВЬЮЕР 
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
// function handleProfileFormSubmit(evt) {
//   // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
//   function makeRequest() {
//     // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
//     return editProfile(popupName.value, popupProfession.value).then((userData) => {
//       profileName.textContent = userData.name;
//       profileProfession.textContent = userData.about;
//     });
//   }
//   // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
//   handleSubmit(makeRequest, evt);
// }