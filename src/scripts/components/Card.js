export class Card {
  constructor(data, selectorTemplateCard, handleImageClick, userId, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._selectorTemplateCard = selectorTemplateCard;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  //копия template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._selectorTemplateCard).content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

   //создает карточку
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._likeCountElement = this._element.querySelector('.card__vector-count');
    this._likeButton = this._element.querySelector('.card__vector');
    this._image = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector('.card__button-del');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setListeners();
    this.setLikes(this._likes);
    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
   }

   return this._element;

  };

  _addHandleLike() {
    this._likeButton.classList.add('card__vector_active');
  };

  _removeHandleLike() {
    this._likeButton.classList.remove('card__vector_active');
  };

  userHasLikedCard() {
    return this._likes.find(user => user._id === this._userId);
  };
  
  setLikes(newLikes) {
    this._likes = newLikes
    this._likeCountElement.textContent = this._likes.length
    if (this.userHasLikedCard()) {
      this._addHandleLike()
    } else {
      this._removeHandleLike()
    }
  }

  //Функция удаляет карточку.
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setListeners() {
    this._image.addEventListener('click',  this._handleImageClick);
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)});
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)});
  }
}