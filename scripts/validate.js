
const showInputError = (formElement, inputElement, errorMessage,rest) => {
  const errorElement = formElement.querySelector(`.error-${inputElement.id}`)
  inputElement.classList.add(rest.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(rest.errorClass);
}

const hideInputError =  (formElement, inputElement,rest)  => {
  const errorElement = formElement.querySelector(`.error-${inputElement.id}`)
  inputElement.classList.remove(rest.inputErrorClass);
  errorElement.classList.remove(rest.errorClass);
  errorElement.textContent = '';
}

const isValid = (formElement,inputElement,rest) => {
  if(!inputElement.validity.valid) {
      showInputError(formElement,inputElement,inputElement.validationMessage,rest);
  } else {
      hideInputError(formElement,inputElement,rest);
  }
}

// Кнопка не активна

const disableSubmitButton = (buttonElement,rest) => {
  buttonElement.classList.add(rest.inactiveButtonClass);
  buttonElement.setAttribute('disabled',true)
}

// Обработчик событий на полях.
const setEventListeners = (formElement,rest) => {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  toggleButtonState(inputList,buttonElement,rest);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
          isValid(formElement,inputElement,rest);
          toggleButtonState(inputList,buttonElement,rest);
      })
  })
}

//Проверка валидности
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) =>{
      return !inputElement.validity.valid
  });
}

//Кнопка активна
const toggleButtonState = (inputList, buttonElement,rest) => {
  if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement,rest);
  } else {
      buttonElement.classList.remove(rest.inactiveButtonClass);
      buttonElement.removeAttribute('disabled')
  }
}

const enableValidation = ({...rest}) => {
  const formList = Array.from(document.querySelectorAll(rest.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement,rest);
  })
};

// вынесем конфиг в переменную, чтобы можно было к ней обратиться из index.js когда дизейюлим кнопку
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__seve',
  inactiveButtonClass: 'popup__seve_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error-message_visible'
}

enableValidation(config);