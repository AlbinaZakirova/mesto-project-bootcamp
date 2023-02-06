import {closePopup, openPopup} from "./utils";
import {addPopup, popupBackground} from "./modal";

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
export const createCard = data => {
  const elementTemplate = document.getElementById('element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__info-title').textContent = data.name;
  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = data.link;
  elementPhoto.alt = data.name;


//лайк
element.querySelector('.element__like').addEventListener('click', evt => {
  evt.target.classList.toggle('element__like_active');
});

//удаление поста
element.querySelector('.element__trash').addEventListener('click', () => {
  element.remove()
});

//открытие попапа фотографии
elementPhoto.addEventListener('click', e => {
  e.preventDefault();
  const popupPhoto = popupBackground.querySelector('.popup__photo');
  const popupTitle = popupBackground.querySelector('.popup__info-title');
  popupPhoto.src = data.link;
  popupTitle.textContent = data.name;

  openPopup(popupBackground)
});

  return element;
}

//вставить карточку в разметку 
export const newPost = data => elements.prepend(createCard(data))

initialCards.forEach(newPost);

export const name = document.querySelector('.form__input_place_name');
export const link = document.querySelector('.form__input_link_photo');

//обработчик отправки формы добавления поста 
export function submitPostForm(e) {
  e.preventDefault();

  newPost({name: name.value, link: link.value});

  closePopup(addPopup);
};
