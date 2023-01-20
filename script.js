const editPopup = document.getElementById('profile-popup'); //попап редактирования профиля
const addPopup = document.getElementById('element-popup'); //попап добавления поста
const popupBackground = document.querySelector('.popup_background'); //popup фотографий

const editOpenPopupButton = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const addOpenPopupButton = document.querySelector('.profile__add-button'); //кнопки открытия попапа добавления поста
const closePopupButtons = document.querySelectorAll('.close'); //кнопки закрытия попапов

const openPopupHandler = (popup, button, el) => {   //Открыть попап по кнопкам/popup попап, который нужно открыть/buttons кнопки, по которым открывается попап
  button.addEventListener('click', e => {
    e.preventDefault();
    if (popup === popupBackground) {
      const popupPhoto = popupBackground.querySelector('.popup__photo');
      const popupTitle = popupBackground.querySelector('.popup__info-title');
      popupPhoto.src = el.link;
      popupTitle.textContent = el.name;
    }
    popup.classList.add('popup_opened');
  })
};

openPopupHandler(editPopup, editOpenPopupButton);
openPopupHandler(addPopup, addOpenPopupButton);

const closePopup = popup => popup.classList.remove('popup_opened');  //закрытие попапа, который нужно закрыть

closePopupButtons.forEach(button =>
  button.addEventListener('click', e => {
    switch (e.target.parentNode.parentNode) {
      case editPopup:
        closePopup(editPopup);
        break;
      case addPopup:
        closePopup(addPopup);
        break;
      default:
        closePopup(popupBackground);
    }
  })
);

//массив с готовыми постами
let initialCards = [
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
const newPost = el => {
  const elementTemplate = document.getElementById('element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elements = document.querySelector('.elements');
  element.querySelector('.element__info-title').textContent = el.name;
  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = el.link;
  elements.prepend(element);

  //лайк
  element.querySelector('.element__like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  });

  //удаление поста
  element.querySelector('.element__trash').addEventListener('click', () => {
    element.remove()
  });

  openPopupHandler(popupBackground, elementPhoto, el);
}

initialCards.forEach(newPost);

//обработчик отправки формы добавления поста
const postFormSubmit = e => {
  e.preventDefault();

  const name = document.querySelector('.form__input_place_name').value;
  const link = document.querySelector('.form__input_link_photo').value;
  newPost({name, link});
  initialCards.unshift({name, link});

  closePopup(addPopup);
};

//форма добавления поста
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', postFormSubmit);

//обработчикотправки формы редактирования профиля
function profileFormSubmit(e) {
  e.preventDefault();

  const fio = document.querySelector('.form__input_name_fio').value;
  const profession = document.querySelector('.form__input_name_profession').value;

  if (fio.length < 1 || profession.length < 1) return;

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = fio;
  profileSubtitle.textContent = profession;

  closePopup(editPopup);
}

//форма редактирования профиля
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', profileFormSubmit);

