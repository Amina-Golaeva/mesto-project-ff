import { initialCards } from "../src/components/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  handleDeleteButton,
  handleLikeButton,
} from "./components/card.js";
import { closeModal, openModal,  addCloseListeners } from "./components/modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardList = content.querySelector("section.places .places__list");
const newPlaceForm = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const editButton = document.querySelector(" .profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupCaption = document.querySelector(".popup__caption");
const popupImg = document.querySelector(".popup__image");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardItem = createCard(
    item.name,
    item.link,
    handleDeleteButton,
    handleLikeButton,
    openPopupImg
  );
  cardList.append(cardItem);
});

addCloseListeners(popupTypeEdit);
addCloseListeners(popupTypeNewCard);
addCloseListeners(popupTypeImg);

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileDescription.innerText;
  openModal(popupTypeEdit);
});

addButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const inputTitle = nameInput.value;
  const inputDescription = jobInput.value;
  profileTitle.textContent = inputTitle;
  profileDescription.textContent = inputDescription;
  closeModal(popupTypeEdit);
}
popupEditForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    cardNameInput.value,
    cardUrlInput.value,
    handleDeleteButton,
    handleLikeButton,
    openPopupImg
  );
  cardList.prepend(newCard);
  newPlaceForm.reset();
  closeModal(popupTypeNewCard);
}
newPlaceForm.addEventListener("submit", handleCardFormSubmit);

function openPopupImg(name, link) {
  popupCaption.textContent = name;
  popupImg.src = link;
  popupImg.alt = name;
  openModal(popupTypeImg);
}
