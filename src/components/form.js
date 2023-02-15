import {addCard, changeAvatar, getEditProfile} from "./api";
import {handleSubmit, updateAvatar, updateProfile} from "./utils";
import {addNewPost} from "./card";
import {name, link, addPopup, fio, profession, editPopup, avatarPopup} from "./constants";

//функция отправки формы создания карточки
function submitPostForm(evt) {
  function makeRequest() {
    return addCard({name: name.value, link: link.value})
      .then(res => addNewPost({name: res.name, link: res.link}))
  }
  handleSubmit(makeRequest, evt, addPopup);
}
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', submitPostForm);


// функиця отправки формы редактирования профиля
function submitProfileForm(evt) {
  function makeRequest() {
    return getEditProfile(fio.value, profession.value)
      .then(res => updateProfile(res.name, res.about));
  }

  handleSubmit(makeRequest, evt, editPopup);
}
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', submitProfileForm);


function submitAvatarForm(evt) {
  const avatarLink = avatarForm.querySelector('.form__input_link_photo').value;

  function makeRequest() {
    return changeAvatar(avatarLink)
      .then(res => updateAvatar(res.avatar))
  }

  handleSubmit(makeRequest, evt, avatarPopup);
}
const avatarForm = document.getElementById('avatar-form');
avatarForm.addEventListener('submit', submitAvatarForm);