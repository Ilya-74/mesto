//import { initialCards } from './initialCards.js';
import '../pages/index.css';

import * as constantes from '../scripts/utils/constants';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { api } from './Api.js';

let userId

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
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
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
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
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
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
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

const formElementAddValidator = new FormValidator(constantes.validationConfig, constantes.popupAddCard);
const formElementEditValidator = new FormValidator(constantes.validationConfig, constantes.popupEditForm);
const formAvatarEditValidator = new FormValidator(constantes.validationConfig, constantes.popupEditAvatar);

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileBioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar'
})

constantes.profileOpenPopupButton.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo();
  constantes.nameInput.value = name;
  constantes.jobInput.value = bio;
  editProfilePopup.open();
  formElementEditValidator.resetErrors();
});

constantes.addCardOpenPopupButton.addEventListener('click', () => {
  formElementAddValidator.resetErrors();
  addCardPopup.open();
});

constantes.addAvatarOpenPopupButton.addEventListener('click', () => {
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