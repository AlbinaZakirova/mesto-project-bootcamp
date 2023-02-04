export {showError, hideError, toggleButtonState, checkInputValidity, setEventListener, enableValidation} 
//валидация форм/
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}


function toggleButtonState(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass)
  } else {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass)
  }
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
    if (!errorElement) return;

    if (!isInputValid) {
      showError(inputElement, errorElement, config)
    } else {
      hideError(inputElement, errorElement, config)
    }
}

function setEventListener(formElement, config) {

  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
       toggleButtonState(submitButtonElement, false, config);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    formElement.reset();
  });

  [...inputList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      //блокировка или разблокировка кнопки
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((formItem) => {
    //блокируем кнопку если форма не валидна 
    setEventListener(formItem, config);
  })
}