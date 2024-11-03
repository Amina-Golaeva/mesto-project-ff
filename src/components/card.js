const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export const createCard = function (
  name,
  link,
  handleDeleteButton,
  handleLikeButton,
  openPopupImg
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = link;
  cardImg.alt = name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDeleteButton);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeButton);
  cardImg.addEventListener("click", () => openPopupImg(name, link));
  return cardElement;
};

// @todo: Функция удаления карточки
export function handleDeleteButton(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}

// лайк карточки
export function handleLikeButton(evt) {
 evt.target.classList.toggle("card__like-button_is-active");
}
