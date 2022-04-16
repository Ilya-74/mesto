import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { api } from './Api.js';

let userId

//Объявлены переменые не переиспользуемые.
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const addCardOpenPopupButton = document.querySelector('.profile__button-add');
const addAvatarOpenPopupButton = document.querySelector('.profile__avatar-add')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const popupAddCard = document.querySelector('.popup__form-add');
const popupEditForm = document.querySelector('.popup__form-edit');
const popupEditAvatar = document.querySelector('.popup__form-avatar');
//const cardSelector = '.cards'
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__seve',
  inactiveButtonClass: 'popup__seve_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible'
}


function submitEditAvatarForm({ link }) {
  api.editAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    })
}

function submitFormEditProfile({ name, bio }) {
  api.editProfile(name, bio)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.bio, res.avatar)
      editProfilePopup.close()
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    })
};


function submitFormAddCard({ cardname, link }) {
  api.addCard(cardname, link)
    .then((res) => {
      section.addItem(createCard(res));
      addCardPopup.close();
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    })
}

function createCard(data) {
  const card = new Card(
    data,
    '.cards',
    () => { // handleImageClick
      console.log('handleImageClick')
      imagePopup.open(data.name, data.link);
    },

    userId,

    (id) => {     //удаляем карточку.
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            confirmPopup.close();
          })
          .finally(() => {
            confirmPopup.renderLoading(false);
          })
      });
    },
    (id) => {      //Лайк, добавляет/удаляет.
      if (card.userHasLikedCard()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
      }
    },
  )
  return card.generateCard();
}

function renderCard(data) {
  section.addItem(createCard(data));
}

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;
    section.renderItems(cards);
    //addItem(card);
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message)
    })
  })

const section = new Section(renderCard, '.list');
const imagePopup = new PopupWithImage('.popup_type_imge-edit');
const addCardPopup = new PopupWithForm('.popup_type_cards-edit', submitFormAddCard);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitFormEditProfile);
const editAvatarPopup = new PopupWithForm('.popup_type_avatar-edit', submitEditAvatarForm);
const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');

const formElementAddValidator = new FormValidator(validationConfig, popupAddCard);
const formElementEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAvatarEditValidator = new FormValidator(validationConfig, popupEditAvatar);

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar'
})

profileOpenPopupButton.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = bio;
  editProfilePopup.open();
  formElementEditValidator.resetErrors();
});

addCardOpenPopupButton.addEventListener('click', () => {
  formElementAddValidator.resetErrors();
  addCardPopup.open();
});

addAvatarOpenPopupButton.addEventListener('click', () => {
  formAvatarEditValidator.resetErrors();
  editAvatarPopup.open();
});

formElementAddValidator.enableValidation();
formElementEditValidator.enableValidation();
formAvatarEditValidator.enableValidation();

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();