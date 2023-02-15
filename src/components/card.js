import {userID} from "./utils";
import {removeCard, setLike} from "./api";
import {imagePopup} from "./constants";
import {openPopup} from "./modal";

const popupPhoto = imagePopup.querySelector('.popup__photo');
const popupTitle = imagePopup.querySelector('.popup__info-title');
const elements = document.querySelector('.elements');//секция с постами

//создание карточки и добавление обработчиков 
const createCard = (data) => {
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
    setLike(cardId, isLiked)
      .then(res => {
        elementHeart.classList.toggle('element__like-heart_active'); 
        isLiked = res.likes.some(user => user._id === userID)
        updateLikes(res.likes.length)

      })
      .catch((error) => {
        console.log(error);
      })
  });

  isLiked && elementHeart.classList.add('element__like-heart_active');
  updateLikes(data.likes.length);

 // Удаление карточки
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