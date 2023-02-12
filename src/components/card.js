import {closePopup, openPopup} from "./utils";
import {changeTextOnSubmitButton} from "./index";
import {addPopup, imagePopup} from "./modal";
import {addCard, removeCard, getAllInform, setLike} from "./api";

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
  // console.log('data >>> ', data)


//лайк
  const elementLike = element.querySelector('.element__like');
  const elementHeart = elementLike.querySelector('.element__like-heart');
  const elementCount = elementLike.querySelector('.element__like-count');

  const cardId = data._id;

  // const updateIsLiked = data => data.likes.some(user => user._id === userID);
  const updateLikes = count => elementCount.textContent = count;
  let isLiked = data.likes.some(user => user._id === userID);

  elementLike.addEventListener('click', evt => {
    elementHeart.classList.toggle('element__like-heart_active');
    setLike(cardId, isLiked).then(res => {
      isLiked = res.likes.some(user => user._id === userID)
      updateLikes(res.likes.length)
    });
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
export const addNewPost = (data) => elements.prepend(createCard(data))

//3. Загрузка информации о пользователе с сервера 
//4. Загрузка карточек с сервера
function renderInitialCards() {
  getAllInform()
    .then(([dataCards, dataUser]) => {
      userID = dataUser._id;
      dataCards.reverse().forEach(addNewPost)
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

