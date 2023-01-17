let editPopup = document.querySelector('#profile-popup'); // Само окно
let addPopup = document.querySelector('#element-popup'); // Само окно
let editOpenPopupButtons = document.querySelectorAll('.profile__edit-button'); // Кнопки для показа окна
let addOpenPopupButtons = document.querySelectorAll('.profile__add-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close'); // Кнопка для скрытия окна

editOpenPopupButtons.forEach((button) => { 
  button.addEventListener('click', (e) => { 
      e.preventDefault(); 
      editPopup.classList.add('popup_opened'); 
  })
});

addOpenPopupButtons.forEach((button) => { 
  button.addEventListener('click', (e) => { 
      e.preventDefault(); 
      addPopup.classList.add('popup_opened'); 
  })
});

editOpenPopupButtons.forEach((button) => {   //вот это работает
  closePopupButton.addEventListener('click', (e) => { 
    editPopup.classList.remove('popup_opened'); 
  })
});

addOpenPopupButtons.forEach((button) => {   //а вот это уже нет
  closePopupButton.addEventListener('click', (e) => { 
    addPopup.classList.remove('popup_opened'); 
  })
});





