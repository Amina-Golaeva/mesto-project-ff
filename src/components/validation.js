

export const showInputError = (formElement, inputElement, errorMessage) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup_input-type-error");
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  };
  
   const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup_input-type-error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  };
  
  
  export const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement);
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add("button_inactive");
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove("button_inactive");
    }
  };
  
  
  export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");
  
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement); 
    });
  
    buttonElement.disabled = true; 
    buttonElement.classList.add("button_inactive"); 
  };
  
  
  export const validationConfig = {
    popupButtonSelector: ".popup__button",
    inactiveButton: ".button_inactive",
    inputTypeError: ".popup_input-type-error",
    error: ".form__input-error_active"
  };
  
  