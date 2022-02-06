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