import { openPopupPic } from './index.js';

export class Card {
  constructor(data, selectorTemplateCard) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplateCard = selectorTemplateCard;
    this._openPopupPic = openPopupPic;
  }
  
    //копия template
  _getTemplate() {
    const cardElement = document.querySelector(this._selectorTemplateCard).content.querySelector('.card').cloneNode(true); 
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
  
    //Попап, лайк, корзина.
  _setListeners() {
    this._image.addEventListener("click", () => {
      this._openPopupPic(this._name, this._link);
    })

    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._element.querySelector(".card__vector")) {
        evt.target.classList.toggle("card__vector_active");
      } else if (evt.target === this._element.querySelector(".card__button-del")) {
        this._element.remove();
      }
    })
  }
}