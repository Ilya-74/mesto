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
//const inputCardName = document.querySelector('.popup__input_card_name');
//const inputCardLink = document.querySelector('.popup__input_card_link');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
//const profileName = document.querySelector('.profile__name');
//const profileBio = document.querySelector('.profile__bio');
//const popupCards = document.querySelector('.popup_type_cards-edit');
//const popupEdit = document.querySelector('.popup_type_profile-edit');
//const popupImg = document.querySelector('.popup_type_imge-edit');
const list = document.querySelector('.list');
//const popupPhoto = document.querySelector('.popup__photo');
//const popupPhotoCaption = document.querySelector('.popup__photo-caption')
//const popups = document.querySelectorAll('.popup'); 
const popupAddCard = document.querySelector('.popup__form-add');
const popupEditForm = document.querySelector('.popup__form-edit')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__seve',
  inactiveButtonClass: 'popup__seve_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible'
}
const formElementAddValidator = new FormValidator(validationConfig, popupAddCard);

const formElementEditValidator = new FormValidator(validationConfig, popupEditForm);



/*function openPopup(popup) {
  popup.classList.add('popup_opened');
  //document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //document.removeEventListener("keydown", handleEscKey);
}*/

/*function handleEscKey(event) {
  if (event.key === 'Escape') {
    const popupCloseEsc = document.querySelector('.popup_opened');
    closePopup(popupCloseEsc);
  }
}*/
profileOpenPopupButton.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = bio;
  editProfilePopup.open();
});

/*function openPopupEdit() {
  
  formElementEditValidator.resetErrors();
  
}*/

//Add фотографии PopUp
addCardOpenPopupButton.addEventListener('click', () => {
  formElementAddValidator.resetErrors();
  addCardPopup.open();
});

/*function openPopupAdd() {
  popupAddCard.reset();
  
  openPopup(popupCards);
}*/

const submitFormEditProfile = (data) => {
  const {name, bio} = data
  //profileName.textContent = name;
  //profileBio.textContent = description;
  userInfo.setUserInfo(name, bio)
  editProfilePopup.close();
}

const submitFormAddCard = (data) => {
  const card = createCard({
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





/*export function openPopupPic(name, link) {
  //popupPhoto.src = link;
  //popupPhoto.alt = name;
  //popupPhotoCaption.textContent = name;
  openPopup(popupImg);
}*/

//Функция закрывает попап
/*popups.forEach(popup => popup.addEventListener('mousedown', event => {
  if (
    event.target.classList.contains('popup') | 
    event.target.classList.contains('popup__imge-close')
    ) {
    closePopup(popup);
  }
})
);*/


//popupAddCard.addEventListener('submit', submitFormAddImage);
//popupEditForm.addEventListener('submit', submitFormEditProfile);

//initialCards.forEach(data => renderCard(data));
formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards');
const imagePopup = new PopupWithImage('.popup_type_imge-edit');
const addCardPopup = new PopupWithForm('.popup_type_cards-edit', submitFormAddCard);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitFormEditProfile);

imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()
section.renderItems()
const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio' })