import {
  BASE_URL,
} from '../components/constants';

class Api {
  constructor(url = BASE_URL) {
    this._url = url;
  }

  _makeFetchRequest(url, method = 'GET', body = null) {
    const config = {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }

    if (body) {
      config.body = JSON.stringify(body);
    };

    return fetch(url,config)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  };

  getUser() {
    return this._makeFetchRequest(`${BASE_URL}/users/me`)
  }

  updateProfile(userInfo, currentuser) {
    return this._makeFetchRequest(`${BASE_URL}/users/${currentuser._id}`, 'PATCH', {
      name: userInfo.name,
      about: userInfo.about,
    });
  };

  updateProfilePicture(avatar, currentUser) {
    return this._makeFetchRequest(`${BASE_URL}/users/${currentUser._id}/avatar`, 'PATCH', {avatar: avatar})
  }

  getCardArray() {
    return fetch(`${BASE_URL}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // include credentials in the request
    })
      .then((res) => res.json())
      .then((cards) => {
        return cards;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(card) {
    return this._makeFetchRequest(`${BASE_URL}/cards`, 'POST', {name: card.cardName, link: card.cardLink})
  }

  removeCard(cardId) {
    return this._makeFetchRequest(`${BASE_URL}/cards/${cardId}`, 'DELETE')
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._makeFetchRequest(`${BASE_URL}/cards/${cardId}/likes`, `${isLiked ? 'DELETE' : 'PUT'}`)
  }
}

const newApi = new Api();
export default newApi;
