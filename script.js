//закрытие и открытие попапов редактирования профиля и добавления поста 
const editPopup = document.querySelector('#profile-popup'); // попап редактирования профиля
const addPopup = document.querySelector('#element-popup'); // попап добавления поста
const editOpenPopupButton = document.querySelectorAll('.profile__edit-button'); // Кнопки для показа попапа редактирования профиля
const addOpenPopupButton = document.querySelectorAll('.profile__add-button'); // Кнопки для показа попапа добавления поста 
const closePopupButtons = document.querySelectorAll('.close'); // Кнопка для скрытия попавов

const fioInput = document.querySelector('.form__input_name_fio'); // Поле имени в форме редактирования профиля
const professionInput = document.querySelector('.form__input_name_profession'); // Поле профессии в форме редактирования профиля
const profileTitle = document.querySelector('.profile__title'); // переменная, в которую сохранится имя
const profileSubtitle = document.querySelector('.profile__subtitle'); //переменная, в которую сохранится профессия
const formElementProfile = document.querySelector('#profilefields'); // Форма в окне редактирования профиля

const titleInput = document.querySelector('.form__input_place_name');// Поле названия места в форме добавления поста
const linkInput = document.querySelector('.form__input_link_photo'); // Поле ссылки в форме добавления поста
const placeTitle = document.querySelector('.element__info-title'); // переменная, в которую сохранится название места
const linkPhoto = document.querySelector('.element__photo'); //переменная, в которую сохранится ссылка на фото
const formElementPlace = document.querySelector('#newplace'); // Форма в окне редактирования профиля

const openPopup = (popup, buttons) => {
  buttons.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      popup.classList.add('popup_opened');
      fioInput.value = profileTitle.textContent;          //Запись данных из профиля в начальное поле ввода имени
      professionInput.value = profileSubtitle.textContent; //Запись данных из профиля в начальное поле ввода профессии
      titleInput.value = placeTitle.textContent;          //Запись данных из профиля в начальное поле ввода названия места
      linkInput.value = linkPhoto.textContent; //Запись данных из профиля в начальное поле ввода ссылки на фото
    })
  )
};

openPopup(editPopup, editOpenPopupButton);
openPopup(addPopup, addOpenPopupButton);

const closePopup = popup => popup.classList.remove('popup_opened');

closePopupButtons.forEach(button =>
  button.addEventListener('click', e =>
    e.target.parentNode.parentNode === editPopup
      ? closePopup(editPopup)
      : closePopup(addPopup)
  )
);

//отправка формы попапа редактирования профиля
function profileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = fioInput.value;          // Получите значение полей  из свойства value
    profileSubtitle.textContent = professionInput.value; //Выберите элементы, куда должны быть вставлены значения полей, Dставьте новые значения с помощью textContent
    closePopup(editPopup);
}

formElementProfile.addEventListener('submit', profileFormSubmit); 

//отправка формы попапа добавления поста

function postFormSubmit(evt) {
  evt.preventDefault(); 
  placeTitle.textContent = titleInput.value;          // Получите значение полей  из свойства value
  linkPhoto.textContent = linkInput.value; //Выберите элементы, куда должны быть вставлены значения полей, Dставьте новые значения с помощью textContent
  closePopup(addPopup);
}

formElementPlace.addEventListener('submit', postFormSubmit); 

//массив постов
const initialCards = [
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

//добавление поста из данных формы

const newPost =  (el) => {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elements = document.querySelector('.elements');
  element.querySelector('.element__info-title').textContent = el.name;
  element.querySelector('.element__photo').src = el.link;
  
  elements.prepend(element); 
}

//добавление массива из JS
initialCards.forEach(newPost);
