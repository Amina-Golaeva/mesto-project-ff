import { removeCard, putLike, deleteLike } from "./api.js";
import { userId } from "../index.js";
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export const createCard = function (
  name,
  link,
  likes,
  ownerId,
  cardData,
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
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLiked = likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      handleDelete(cardData._id, cardElement);
    });
  }

  const cardLikes = cardElement.querySelector(".likes_container");
  cardLikes.textContent = likes.length;

  likeButton.addEventListener("click", () => {
    handleLikeButton(cardData, likeButton, cardLikes, !isLiked);
  });

  cardImg.addEventListener("click", () => openPopupImg(name, link));
  return cardElement;
};
const handleDelete = (id, cardElement) => {
  removeCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

// @todo: Функция удаления карточки
export function handleDeleteButton(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}
// лайк карточки
export function handleLikeButton(cardData, likeButton, cardLikes, isLiked) {
  const likeMethod = isLiked ? putLike : deleteLike;
  likeMethod(cardData._id)
    .then((updatedCard) => {
      cardLikes.textContent = updatedCard.likes.length;

      likeButton.classList.toggle("card__like-button_is-active", isLiked);
    })
    .catch((err) => console.log(err));
}
