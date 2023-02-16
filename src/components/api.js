//создаем объект, чтобы адрес B заголовки был в нем, и не пришлось менять бы его в нескольких местах
const config = {
  url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
  headers: {
    "Content-Type": "application/json",
    "authorization": "35b4ce21-9513-4e5d-a9e0-99c0cc9fd336"
  }
}

function DoOnResponse(res) {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}


//5. Редактирование профиля                                 
export function getEditProfile(fio, profession) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(
      {
        name: fio,
        about: profession
      }
    )
  }).then(DoOnResponse)
}

//6. Добавление новой карточки                           
export function addCard(body) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body)
  }).then(DoOnResponse)
}


//8. Удаление карточки                                    
export function removeCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers

  }).then(DoOnResponse)
}


//3. Загрузка информации о пользователе с сервера        
export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
    .then(DoOnResponse)
}

//4. Загрузка карточек с сервера                          
export function getAllCards() {
  return fetch(`${config.url}/cards`, {
    method: "GET",
    headers: config.headers
  }).then(DoOnResponse)
}


//9. Лайки
export function setLike(cardId, isLiked) {
  return fetch(`${config.url}/cards/likes/${cardId}`,{
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers
  }).then(DoOnResponse)
}

//10. Обновление аватара пользователя
export function changeAvatar(link) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({avatar: link})
  }).then(DoOnResponse)
}

export function getAllInform() {                        
  return Promise.all([getAllCards(), getUserInfo()])
}




