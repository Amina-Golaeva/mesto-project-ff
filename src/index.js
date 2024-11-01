import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import {
  createCard,
  deleteButton,
  likeButton,
  //openPopupImg
  //addCard,
} from "./components/card.js";
import { closeModal, openModal, addListener } from "./components/modal.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardList = content.querySelector("section.places .places__list");
const newPlace = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const editButton = document.querySelector(" .profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupForms = document.querySelector(".popup__form");
const popupEditForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardItem = createCard(
    item.name,
    item.link,
    deleteButton,
    likeButton,
    openPopupImg
  );
  cardList.append(cardItem);
});

addListener(popupTypeEdit);
addListener(popupTypeNewCard);
addListener(popupTypeImg);

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileDescription.innerText;
  openModal(popupTypeEdit);
});

addButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const inputTitle = nameInput.value;
  const inputDescription = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = inputTitle;
  profileDescription.textContent = inputDescription;
  closeModal(popupTypeEdit);
}
popupEditForm.addEventListener("submit", handleFormSubmit);

function handleForm(evt) {
  evt.preventDefault();
  const newCard = createCard(
    cardNameInput.value,
    cardUrlInput.value,
    deleteButton,
    likeButton,
    openPopupImg
  );
  cardList.prepend(newCard);
  newPlace.reset();
  closeModal(popupTypeNewCard);
}
newPlace.addEventListener("submit", handleForm);

function openPopupImg(name, link) {
  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = name;
  const popupImg = document.querySelector(".popup__image");
  popupImg.src = link;
  popupImg.alt = name;
  openModal(popupTypeImg);
}
