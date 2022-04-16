//Объявлены переменые не переиспользуемые.
export const profileOpenPopupButton = document.querySelector('.profile__edit-button');
export const addCardOpenPopupButton = document.querySelector('.profile__button-add');
export const addAvatarOpenPopupButton = document.querySelector('.profile__avatar-add')
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_bio');
export const popupAddCard = document.querySelector('.popup__form-add');
export const popupEditForm = document.querySelector('.popup__form-edit');
export const popupEditAvatar = document.querySelector('.popup__form-avatar');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__seve',
  inactiveButtonClass: 'popup__seve_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible'
}