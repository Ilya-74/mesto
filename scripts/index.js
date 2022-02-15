" use strict ";


//Объявлены переменые не переиспользуемые.
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const addCardOpenPopupButton = document.querySelector('.profile__button-add');
const addCardClosePopupButton = document.querySelector('.popup__close-card');
const addCardSevePopupButton = document.querySelector('.popup__seve_card'); // //popup__seve_add
const inputCardName = document.querySelector('.popup__input_card_name');
const inputCardLink = document.querySelector('.popup__input_card_link');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const popupImgClose = document.querySelector('.popup__close-img');
const popupCloseButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupCards = document.querySelector('.popup_type_cards-edit');
const popupForm = document.querySelector('.popup__form');
const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupImg = document.querySelector('.popup_type_imge-edit');
const cards = document.querySelector('.cards').content;
const list = document.querySelector('.list');

//Дефолтная функция отрыть PopUp.
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Дефолтная функция Закрыть PopUp.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция выполняет открытия попап карточки.
function openPopupAdd() {
  openPopup(popupCards);//Выполнили открытие попап. 
  inputCardName.value = "";//Передаем инпуты в попап, для отображения.
  inputCardLink.value = "";
}
//функция выполняет закрытия попап карточки.
function closePopupAdd() {
  closePopup(popupCards);//Выполнили закрыти попап.
}
//Повесили обработчики(шорох) событий на кнопки, по клику открыли/закрыли финкцию.
addCardOpenPopupButton.addEventListener('click', () => openPopup(popupCards));
addCardClosePopupButton.addEventListener('click', () => closePopup(popupCards));

//Повесили обработчики(шорох) событий на кнопку(Крестик закрытия картинки), по клику открыли/закрыли финкцию.
popupImgClose.addEventListener('click', () => closePopup(popupImg));

//Функция выполняет передачу текста между инпутами для Профиля Кусто.
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;

  closePopup(popupEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);

//Повесили обработчики(шорох) событий на кнопки, по клику открыли/закрыли финкцию.
profileOpenPopupButton.addEventListener('click', () => openPopup(popupEdit));
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));

function createCard(card){ //Локальные переменые в функции клонирования карточек.
  const cardElement = cards.cloneNode(true);
  const cardImages = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  //Лайк - Нашли элемент и додавили обработчик событий по клику.
  const likeActive = cardElement.querySelector('.card__vector');
  likeActive.addEventListener('click', addLike);



  //Объявили переменую, нашли элемент(Кнопка удаления) в карточке.
  const deleteButton = cardElement.querySelector('.card__button-del');
  deleteButton.addEventListener('click', deleteCard); //Удалили карточку по клику.
  // По клику на карточку открывается функция карточки(Большое фото), через обработчик событий.
  cardImages.addEventListener('click', () => openPopupPic(card));
  //Передаем информацию для отображения.
  cardTitle.textContent = card.name;
  cardImages.alt = card.name
  cardImages.src = card.link;
  //Завершили выполнения функции клонирования карточек и вернули ее значение.
  return cardElement;
}
// Функция вставляет карточку в начало.
function renderCard(card) { 
  list.prepend(createCard(card)); 
} 
// Рендерим каждый элемент в массиве.
initialCards.forEach(renderCard);

// Функция генерирует событие, передачи информации, из полей попап на страницу.  
function addItem(event) {
  event.preventDefault();
  closePopupAdd();
  renderCard({name: inputCardName.value, link: inputCardLink.value});
  document.querySelector('.popup__form-add').reset()//Очистка полей.
}
// Обработчик событий по клику, вызываем функцию выше.
addCardSevePopupButton.addEventListener('click', addItem);



//Функция лайк. 
function addLike(e) {
  e.target.classList.toggle('card__vector_active');// Ссылаемся на объект инициирующий событие.
}

//Функция удаляет карточку.
function deleteCard(e) {
  e.target.closest('.card').remove();// Ссылаемся на объект инициирующий событие, и удаляем из ДОМ в котором элемент находится. 
}

const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__photo-caption')
// Функция карточки(Большое фото).
function openPopupPic(data) {
  openPopup(popupImg);// Открывается попап.
  popupPhoto.src = data.link;//Передали картнку(Увеличили)
  popupPhoto.alt = data.name;//Назване если картинка не отобразилась.
  popupPhotoCaption.textContent = data.name;// подпись к картинке.
}

//===================================Валидация форм===============================================

const formSubmit = (evt, popupForm) => {
  evt.preventDefault();
  if (popupForm.checkValidity()) {  //если форма валидная.
    popupForm.reset();//очистили поля формы.
  }
}
//Функция убирает класс с ошибкой в поле.
const setInputValid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = ''; //- сообщения об ошибке.
  input.classList.remove(inputErrorClass);//- класс с ошибкой(красное поле).
}
//Функция добовляет класс с ошибкой в поле.
const setInputInvalid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage; //+ сообщения об ошибке.
  input.classList.add(inputErrorClass);//+ класс с ошибкой(красное поле).

}
//Проверка валидации.
const checkInputValidity = ({ inputErrorClass }, popupForm, input) => {
  const errorMessage = popupForm.querySelector(`#error-${input.id}`);//нашли инпут.

  if (input.validity.valid) {
    setInputValid(inputErrorClass, errorMessage, input);//если пройдена, убрли ошибку.
  } else {
    setInputInvalid(inputErrorClass, errorMessage, input);//если проверка не пройдена, добовляем ошибку.
  }
}

const setButtonValid = (disabledButtonClass, popupSeveDisabled) => {
  popupSeveDisabled.removeAttribute('disabled');
  popupSeveDisabled.classList.remove(disabledButtonClass);

}

const setButtonInvalid = (disabledButtonClass, popupSeveDisabled) => {
  popupSeveDisabled.setAttribute('disabled', '');
  popupSeveDisabled.classList.add(disabledButtonClass);
}

const checkButtonValidity = ({ disabledButtonClass }, popupForm, popupSeveDisabled) => {
  if (popupForm.checkValidity()) {
    setButtonValid(disabledButtonClass, popupSeveDisabled);

  } else {
    setButtonInvalid(disabledButtonClass, popupSeveDisabled);
  }
}

enableValidation({
  inputSelector: '.popup__input_type',
  inputErrorClass: 'popup__input_type_error',
  buttonSelector: '.popup__seve_add',
  disabledButtonClass: 'popup__seve_disabled',
});

//=========================================

const formCardSubmit = (evt) => {
  evt.preventDefault();
}

const setCardInputValid = (inputCardErrorClass, errorCardMessage, input) => {
  errorCardMessage.textContent = ''; //если все хорошо, стираем ошибку.
    input.classList.remove(inputCardErrorClass);

}

const setCardInputInvalid = (inputCardErrorClass, errorCardMessage, input) => {
  errorCardMessage.textContent = input.validationMessage;//если валидация не проходит, добовляем сообщение об ошибке.
    input.classList.add(inputCardErrorClass);
}

const checkCardInputValidity = ({ inputCardErrorClass }, popupAddForm, input) => {
  const errorCardMessage = popupAddForm.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    setCardInputValid(inputCardErrorClass, errorCardMessage, input);
  } else {
    setCardInputInvalid(inputCardErrorClass, errorCardMessage, input);
  }

}

const setCardButtonValid = (disabledCardButtonClass, button) => {
  button.removeAttribute('disabled');
    button.classList.remove(disabledCardButtonClass);

}

const setCardButtonInvalid = (disabledCardButtonClass, button) => {
  button.setAttribute('disabled', '');
    button.classList.add(disabledCardButtonClass);

}

const checkCardButtonValidity = ({ disabledCardButtonClass },popupAddForm, button) => {
  if (popupAddForm.checkValidity()) {
    setCardButtonValid(disabledCardButtonClass, button);
  } else {
    setCardButtonInvalid(disabledCardButtonClass, button);
  }
}

function enableCardValidation({ formSelector, inputCardSelector, buttonCardSelector, ...rest }) {
  const popupAddForm = document.querySelector(formSelector);

  popupAddForm.addEventListener('submite', (evt) => formCardSubmit(evt, popupAddForm));
  const inputsCard = popupAddForm.querySelectorAll(inputCardSelector);
  const button = popupAddForm.querySelector(buttonCardSelector)

  checkCardButtonValidity(rest, popupAddForm, button); //Вызвали функцию не активной кнопки.

  inputsCard.forEach(input => {
    input.addEventListener('input', () => {
      checkCardInputValidity(rest, popupAddForm, input);
      checkCardButtonValidity(rest, popupAddForm, button);
                                    
    });
  });
} 


enableCardValidation({
  formSelector: '.popup__form-add',
  inputCardSelector: '.popup__input_card',
  inputCardErrorClass: 'popup__input_type_error',
  buttonCardSelector: '.popup__seve_button',
  disabledCardButtonClass: 'popup__seve_disabled',
});


const popupCloseClickFormProfile = document.querySelector('.popup_type_profile-edit');
const popupCloseClickFormCard = document.querySelector('.popup_type_cards-edit');
const popupCloseClickFormImge = document.querySelector('.popup_type_imge-edit');
const popupContainer = document.querySelector('.popup__container');

function popupCloseForm(evt) { 
  if(evt.target === popupCloseClickFormProfile) { // Если цель клика - фон, то:
    popupCloseClickFormProfile.classList.remove('popup_opened'); // Убираем активный класс с фона
    popupContainer.classList.remove('popup_opened'); // И с окна
  }
  if(evt.target === popupCloseClickFormCard) { // Если цель клика - фон, то:
    popupCloseClickFormCard.classList.remove('popup_opened'); // Убираем активный класс с фона
    popupContainer.classList.remove('popup_opened'); // И с окна
  }
  if(evt.target === popupCloseClickFormImge) { // Если цель клика - фон, то:
    popupCloseClickFormImge.classList.remove('popup_opened'); // Убираем активный класс с фона
    popupContainer.classList.remove('popup_opened'); // И с окна
  }

}
document.addEventListener('click', popupCloseForm); // Вешаем обработчик на весь документ

//Закрыли кнопкой Esc
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
  //функция закрытия окна
  popupCloseClickFormProfile.classList.remove('popup_opened');
  popupCloseClickFormCard.classList.remove('popup_opened');
  popupCloseClickFormImge.classList.remove('popup_opened');
  }
  });
