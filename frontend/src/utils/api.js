import { apiUrl, authorization } from '../components/constants';

class Api {
  constructor(url = apiUrl, authorizationToken = authorization) {
    this._url = url;
    this._authorization = authorizationToken;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      console.log(err);
    });
  }

  updateProfile(userInfo, button) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userInfo.name}`,
        about: `${userInfo.about}`,
      }),
    }).catch((err) => console.log(err));
  }

  updateProfilePicture(avatar, button) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }

  getCardArray() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      console.log(err);
    });
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.cardName,
        link: card.cardLink,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }

  removeCard(cardId, button) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application.json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
}

const newApi = new Api();
export default newApi;
