" use strict ";


//Объявлены переменые не переиспользуемые.
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const addCardOpenPopupButton = document.querySelector('.profile__button-add');
const addCardClosePopupButton = document.querySelector('.popup__close-card');
const addCardSevePopupButton = document.querySelector('.popup__seve_card');
const inputCardName = document.querySelector('.popup__input_card_name');
const inputCardLink = document.querySelector('.popup__input_card_link');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const popupImgClose = document.querySelector('.popup__close-img');
const popupImgOpen = document.querySelector('.popup__imge-open');
const popupCloseButton = document.querySelector('.popup__close');
const popupFormAdd = document.querySelector('.popup__form-add');
const popupSeveButton = document.querySelector('.popup__seve');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupCards = document.querySelector('.popup_cards');
const popupForm = document.querySelector('.popup__form');
const popupEdit = document.querySelector('.popup_edit');
const popupImg = document.querySelector('.popup_imge');
const cards = document.querySelector('.cards').content;
const popup = document.querySelector('.popup');
const list = document.querySelector('.list');

//Дефолтная функция отрыть PopUp.
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Дефолтная функция Закрыть PopUp.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Редактирование профиля.
function openPopupEdit() {
    openPopup(popupEdit);  
    nameInput.value = profileName.textContent;
    jobInput.value = profileBio.textContent; 
}
//Закрыть попап.
function closePopupEdit() {
    closePopup(popupEdit);
}
//Повесили обработчики(шорох) событий на кнопки, по клику открыли/закрыли финкцию.
profileOpenPopupButton.addEventListener('click', () => openPopup(popupEdit));
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));

//Написали функцию для открытия попап карточки.
function openPopupAdd() {
  openPopup(popupCards);//Выполнили открытие попап. 
  inputCardName.value = "";//Передаем инпуты в попап, для отображения.
  inputCardLink.value = "";
}
//Написали функцию для закрытия попап карточки.
function closePopupAdd() {
  closePopup(popupCards);//Выполнили закрыти попап.
}
//Повесили обработчики(шорох) событий на кнопки, по клику открыли/закрыли финкцию.
addCardOpenPopupButton.addEventListener('click', () => openPopup(popupCards));
addCardClosePopupButton.addEventListener('click', () => closePopup(popupCards));

//Повесили обработчики(шорох) событий на кнопку(Крестик закрытия картинки), по клику открыли/закрыли финкцию.
popupImgClose.addEventListener('click', () => closePopup(popupImg));

//Написали функцию для Профиля Кусто.
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;

  closePopup(popupEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);

//Массив с карточками.
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
// Функция для вставки карточки в начало.
function renderCard(card) { 
  list.prepend(createCard(card)); 
} 
// Рендерим каждый элемент в массиве.
initialCards.forEach(renderCard);

// Функция генерации событие, передачи информации, из полей попап на страницу.  
function addItem(event) {
  event.preventDefault();
  closePopupAdd();
  renderCard({name: inputCardName.value, link: inputCardLink.value});
}
// Обработчик событий по клику, вызываем функцию выши.
addCardSevePopupButton.addEventListener('click', addItem);

//Функция лайк. 
function addLike(e) {
  e.target.classList.toggle('card__vector_active');// Ссылаемся на объект инициирующий событие.
}

//Функция удаления карточки.
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