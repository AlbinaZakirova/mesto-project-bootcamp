//import { link } from "./card";

//создаем объект, чтобы адрес B заголовки был в нем, и не пришлось менять бы его в нескольких местах
const config = {
  url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
  headers: {
      "Content-Type": "application/json",
      "authorization": "35b4ce21-9513-4e5d-a9e0-99c0cc9fd336"
  }
}

function onResponse(res) {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

//4. Загрузка карточек с сервера                          РЕАЛИЗОВАНО
export function getAllCards() {
  return fetch(`${config.url}/cards`, {
    method: "GET",
    headers: config.headers   
  }).then (onResponse)
} 

//5. Редактирование профиля                               НАПИСАН ТОЛЬКО ПРОМИС, РЕАЛИЗОВАТЬ НЕ МОГУ
export function getEditprofile() {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(
      {
        name: fio.value,
        about: profession.value
      }
    )  
  }).then (onResponse)
} 

//6. Добавление новой карточки                           РЕАЛИЗОВАНО
export function addCard(body) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body)
  }).then(onResponse)
}


//8. Удаление карточки                                  РЕАЛИЗОВАНО ЧАСТИЧНО 
export function removeCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers

  }).then (onResponse)
} 

 
//3. Загрузка информации о пользователе с сервера        РЕАЛИЗОВАНО
export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then(onResponse)
}


export function getAllInform () {                        //СКАЗАЛИ ЧТО ЭТО ОБЯЗАТЕЛЬНО, ЧТОБЫ НЕ БЫЛО СБОЯЕСЛИ ВЫЗОВЫ ПРИДУТ НЕ ПРАВИЛЬНО ПО ОЧЕРЕДНОСТИ
  return Promise.all([getAllCards(), getUserInfo()])
}



