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

