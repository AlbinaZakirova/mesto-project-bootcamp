import {getAllInform} from "./api";
import {addNewPost} from "./card";
import {profileSubtitle, profileTitle} from "./constants";
import {closePopup} from "./modal";

export let userID = null;
export function renderInitialCards() {
  getAllInform()
    .then(([dataCards, dataUser]) => {
      userID = dataUser._id;
      dataCards.reverse().forEach(addNewPost);
    })
    .catch((error) => {
      console.log(error);
    })
}

export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

export function handleSubmit(request, evt, popup, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => evt.target.reset())
    .catch(err => console.error(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton, initialText);
      setTimeout(() => closePopup(popup), 1500);
}


export const updateProfile = (fio, profession) => {
  profileTitle.textContent = fio;
  profileSubtitle.textContent = profession;
}

const avatar = document.querySelector('.profile__avatar');
export const updateAvatar = link => avatar.src = link;

