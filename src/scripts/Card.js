export class Card {
  constructor(data, selectorTemplateCard, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setLikes() {
    const likeCountElement = this._element.querySelector('.card__vector-count')
    likeCountElement.textContent = this._likes.length
  }

 // _handleLike = () => {
  //  this._likeButton.classList.toggle('card__vector_active');
  //}

  //Функция удаляет карточку.
 deleteCard = () => {
    this._element.remove();
    this._element = null;
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
    this._setLikes()
    if(this._ownerId !== this._userId) {
      this._element.querySelector('.card__button-del').style.display = 'none';
    }
    this._setListeners();
    return this._element;
  }

  _setEvtListeners() {
    this._element.querySelector(".card__image")
      .addEventListener('click', () => this._handleImageClick())
    this._likeButton.addEventListener('click', () => this._handleLikeClick())
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id))
  }

  //Попап, лайк, корзина.
  _setListeners() {
    this._deleteButton = this._element.querySelector('.card__button-del');
    this._likeButton = this._element.querySelector('.card__vector');
    this._setEvtListeners();
  }
}