import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

//Объявлены переменые не переиспользуемые.
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const addCardOpenPopupButton = document.querySelector('.profile__button-add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const list = document.querySelector('.list');
const popupAddCard = document.querySelector('.popup__form-add');
const popupEditForm = document.querySelector('.popup__form-edit');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__seve',
  inactiveButtonClass: 'popup__seve_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible'
}


const submitFormEditProfile = (data) => {
  const {name, bio} = data
  userInfo.setUserInfo(name, bio)
  editProfilePopup.close();
}

const submitFormAddCard = (data) => {
  const card = renderCard({
    name: data['cardname'],
    link: data.link
  });

  section.addItem(card);
  addCardPopup.close();
}

const createCard = (data) => {
  const card = new Card(data, '.cards', () => {
    imagePopup.open(data.name, data.link)
  });
  return card.createCard();
}

const renderCard = (data) => {
  const card = createCard(data);
 list.prepend(card);
}

addCardOpenPopupButton.addEventListener('click', () => {
  formElementAddValidator.resetErrors();
  addCardPopup.open();
});

profileOpenPopupButton.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = bio;
  editProfilePopup.open();
  formElementEditValidator.resetErrors();
});

const formElementAddValidator = new FormValidator(validationConfig, popupAddCard);
const formElementEditValidator = new FormValidator(validationConfig, popupEditForm);
const section = new Section({ items: initialCards, renderer: renderCard }, '.cards');
const imagePopup = new PopupWithImage('.popup_type_imge-edit');
const addCardPopup = new PopupWithForm('.popup_type_cards-edit', submitFormAddCard);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitFormEditProfile);
const userInfo = new UserInfo({ 
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio' 
})


formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();
imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()
section.renderItems()