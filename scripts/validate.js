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

function enableValidation({ formSelector, inputSelector, buttonSelector, ...rest}) {

    popupForm.addEventListener('submit', (evt) => formSubmit(evt, popupForm));//принимаем evt и передаем evt и форму.
    const inputs = popupForm.querySelectorAll(inputSelector);
    const popupSeveDisabled = popupForm.querySelector(buttonSelector);
  
  
  
    checkButtonValidity(rest, popupForm, popupSeveDisabled);
   
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(rest, popupForm, input);
        checkButtonValidity(rest, popupForm, popupSeveDisabled);
      }); 
    });
  }

//========================================================

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