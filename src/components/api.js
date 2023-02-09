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

//функция для получения всех карточек 
export function getAllCards() {
  return fetch(`${config.url}/cards`, {
    method: "GET",
    headers: config.headers   
  }).then (onResponse)
} 

//функция создания карточки
export function addCard(body) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body)
  }).then(onResponse)
}


//функция удаления карточки 
export function removeCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers

  }).then (onResponse)
} 

 
//запрос данных пользователя
export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then(onResponse)
}

export function getAllInform () {
  return Promise.all([getAllCards(), getUserInfo()])
}



