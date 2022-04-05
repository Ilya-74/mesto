import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { api } from './Api.js';

let userId

api.getProfile()
  .then(res => {
    console.log(res)
    userInfo.setUserInfo(res.name, res.about)

    userId = res.id
})

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = renderCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data.id,
        userId: userId,
        ownerId: data.owner._id
      });
      section.addItem(card)
    })
  })

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

  api.editProfile(name, bio)
    .then(() => {
      userInfo.setUserInfo(name, bio)
      editProfilePopup.close()
    })
};

const submitFormAddCard = (data) => {
  api.addCard(data['cardname'], data.link)
    .then(res => {
      const card = renderCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res.id,
        userId: userId,
        ownerId: res.owner._id
      })
      section.addItem(card);
      addCardPopup.close();
    })
}

const createCard = (data) => {
  const card = new Card(
      data,
      '.cards', 
      () => {
        imagePopup.open(data.name, data.link)
      },
      (id) => {
        confirmPopup.open()
        confirmPopup.changeSubmitHandler(() => {
          api.deleteCard(id)
            .then(res => {
              card.deleteCard();
              confirmPopup.close();
            })
        })
      },
      () => {
        console.log('')
      }
    );
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
const section = new Section({ items: [], renderer: renderCard }, '.cards');
const imagePopup = new PopupWithImage('.popup_type_imge-edit');
const addCardPopup = new PopupWithForm('.popup_type_cards-edit', submitFormAddCard);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitFormEditProfile);

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');


const userInfo = new UserInfo({ 
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio' 
})


formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
section.renderItems();