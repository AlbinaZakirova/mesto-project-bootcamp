import {profileSubtitle, profileTitle} from "./constants";
import {closePopup} from "./modal";

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
    .then(() => {
      evt.target.reset();
      closePopup(popup);
    })
    .catch(err => console.error(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}


export const updateProfile = (fio, profession) => {
  profileTitle.textContent = fio;
  profileSubtitle.textContent = profession;
}

const avatar = document.querySelector('.profile__avatar');
export const updateAvatar = link => avatar.src = link;

