const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupSeveButton = document.querySelector('.form__submit-btn')


profileOpenPopupButton.addEventListener('click', function() {
    popup.classList.add('popup__opened')
})

popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup__opened')
})