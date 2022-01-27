//Положили в контенер и дали название.

const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileBio = document.querySelector('.profile__bio')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupSeveButton = document.querySelector('.popup__seve')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_bio')

//Определили функцию кнопки: открыть, закрыть popup.
function openPopup() {
    popup.classList.add('popup_opened')
    nameInput.value = profileName.textContent;
    jobInput.value = profileBio.textContent; 
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

//Напишем функцию для полей.
popup.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;    //Текст из popup  сохраняется в html
  profileBio.textContent = jobInput.value;
  closePopup()
})

// запускаем слушателя функции подстановки переменных
profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)