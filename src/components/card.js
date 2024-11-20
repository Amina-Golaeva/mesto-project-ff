import { removeCard,PutLikes,DeleteLikes } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const userId = "3d34150cf11748521829f10b";
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
    likeButton.classList.add(".card__like-button_is-active");
   } else {
    likeButton.classList.remove("card__like-button_is-active");
}

  if (ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton
      .addEventListener("click", () => {
        handleDelete(cardData._id, cardElement);
      });
  }

  const cardLikes = cardElement.querySelector(".likes_container");
  cardLikes.textContent = likes.length;

  likeButton.addEventListener("click", (evt) => {
    const button = evt.target;
    const isButtonLiked = button.classList.toggle("card__like-button_is-active");
    const cardId = cardData._id;

    handleLikeButton(cardId, button, cardLikes, isButtonLiked);
  });
   
  cardImg.addEventListener("click", () => openPopupImg(name, link));
  return cardElement;
};
const handleDelete = (id, cardElement) => { 
  removeCard(id)
  .then(() => {
  cardElement.remove()
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
export function handleLikeButton(cardId, likeButton, cardLikes, isLiked) { 
  if (isLiked) {
    PutLikes(cardId).then((updatedCount) => {
      cardLikes.textContent = updatedCount.likes.length;
    }).catch((err) => {
      console.log(err);
    });
  } else {
    DeleteLikes(cardId).then((updatedCount) => {
      cardLikes.textContent = updatedCount.likes.length;
    }).catch((err) => {
      console.log(err);
    });
  }
};


