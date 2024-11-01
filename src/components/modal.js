const popupForms = document.querySelector(".popup__form");

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
  popupForms.reset();
};

export const addListener = (el) => {
  const popupClose = el.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(el);
  });

  el.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(el);
    }
  });
};
