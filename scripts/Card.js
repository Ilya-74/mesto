//import { openPopupPic } from './index.js';

export class Card {
  constructor(data, selectorTemplateCard, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('card__vector_active');
  }

  //Функция удаляет карточку.
  _handleDeleteCard = () => {
    this._element.remove();
  }

  //копия template
  _getTemplate() {
    const cardElement = document.querySelector(this._selectorTemplateCard)
      .content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //создает карточку
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._image = this._element.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setListeners();
    return this._element;
  }

  _setEvtListeners() {
    this._element.querySelector(".card__image")
      .addEventListener('click', () => this._handleImageClick())

    this._likeButton.addEventListener('click', this._handleLike)
    this._deleteButton.addEventListener('click', this._handleDeleteCard)

  }

  //Попап, лайк, корзина.
  _setListeners() {
    this._deleteButton = this._element.querySelector('.card__button-del');
    this._likeButton = this._element.querySelector('.card__vector');
    this._setEvtListeners();
  }
}