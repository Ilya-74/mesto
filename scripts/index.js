//Положили в контенер и дали название.

const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileBio = document.querySelector('.profile__bio')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupSeveButton = document.querySelector('.popup__seve')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_bio')

//Определили функцию кнопки: открыть, закрыть popup.

function openPopup() {
    popup.classList.add('popup_opened')
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

// запускаем слушателя функции подстановки переменных

profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)

//Напишем функцию для полей.

profileOpenPopupButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;    //Текст из html выводится в popup
})

popupSeveButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;    //Текст из popup  сохраняется в html
  profileBio.textContent = jobInput.value;
})

popupSeveButton.addEventListener('click',function() {
  closePopup(popupSeveButton)                              //Закрытие popup по кнопки 'сохранить'
}); 