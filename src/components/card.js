import {closePopup, openPopup} from "./utils";
import {addPopup, imagePopup} from "./modal";
import { addCard, getAllCards, removeCard, getAllInform } from "./api";

const popupPhoto = imagePopup.querySelector('.popup__photo');
const popupTitle = imagePopup.querySelector('.popup__info-title');
const popupWorning = document.querySelector('#shure-popup');
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
  console.log(userID)
  


//лайк
const elementLike = element.querySelector('.element__like');
elementLike.addEventListener('click', evt => {
  evt.target.classList.toggle('element__like_active');
});
/*const isLiked = data.likes.some(user => user._id === userID);                 //на вебинаре показали что так можно отслеживать лайки по ID, у меня не работает, разумеется
console.log('isLiked', isLiked);

function allLikeView(likes, userID) {                                           //счетчик лайков, не работает, не сверстала форму для отображения количества лайков в карточках
  if(isLiked(likes, userID)) {
    elementLike.classList.add('element__like_active');
  } else {
    elementLike.classList.remove('element__like_active')
  }

}
allLikeView(data.likes, userID);*/



//8. Удаление карточки ПОКА УДАЛЯЮ ЛЮБУЮ, А НАДО, ЧТОБЫ ТОЛЬКО СВОИ
const elementTrash = element.querySelector('.element__trash');
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
export const addNewPost = (data) => elements.append(createCard(data))

//3. Загрузка информации о пользователе с сервера 
//4. Загрузка карточек с сервера
function renderInitialCards() {
  getAllInform()
    .then(([dataCards, dataUser]) => {
      userID = dataUser._id;
      dataCards.forEach(addNewPost)
    })
    .catch((error) => {
      console.log(error);
    })
}

renderInitialCards()

export const name = document.querySelector('.form__input_place_name');
export const link = document.querySelector('.form__input_link_photo');


//6. Добавление новой карточки                                      РАБОТАЕТ, НО НЕ КОРРЕКТНО, ЗАГРУЖАЕТ ПОСТ ТОЛЬКО ПОСЛЕ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
export function submitPostForm(e) {
  e.preventDefault();
  addCard({name: name.value, link: link.value}) 
  .then((addNewPost) => {
    data => elements.append(createCard(data), userID);
  })
  .catch((error) => {
    console.log(error);
  })
  closePopup(addPopup);
};
