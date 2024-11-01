const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export const createCard = function (
  name,
  link,
  deleteButton,
  likeButton,
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
    .addEventListener("click", deleteButton);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeButton);
  cardImg.addEventListener("click", () => openPopupImg(name, link));
  return cardElement;
};

// @todo: Функция удаления карточки
export function deleteButton(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}

// лайк карточки
export function likeButton(evt) {
  const listItem = evt.target.classList.toggle("card__like-button_is-active");
}
