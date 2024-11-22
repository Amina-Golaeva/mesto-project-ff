import { initialCards } from "../src/components/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  handleDeleteButton,
  handleLikeButton,
} from "./components/card.js";
import {
  closeModal,
  openModal,
  addCloseListeners,
} from "./components/modal.js";
import {
  enableValidation,
  clearValidation,

} from "./components/validation.js";
import {
  getInfoUser,
  getInitialCards,
  saveEditProfile,
  getNewCard,
  removeCard,
  updateEditProfile,
} from "./components/api.js";


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardList = content.querySelector("section.places .places__list");
const newPlaceForm = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditImg = document.querySelector(".popup_type_edit_img");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const editButton = document.querySelector(" .profile__edit-button");

const addButton = document.querySelector(".profile__add-button");
const popupEditForm = document.forms["edit-profile"];
const avatarEditForm = document.forms["avatar-profile"]; 
const nameInput = document.querySelector(".popup__input_type_name");
const AvatarInput = document.querySelector(".popup__input_type_url_avatar");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
const popupCaption = document.querySelector(".popup__caption");
const popupImg = document.querySelector(".popup__image");
const popupButton = document.querySelector(".popup__button");
  

export const validationConfig = {
  formSelector: ".popup__form",
  popupButtonSelector: ".popup__button",
  inputSelector:".popup__input",
  inactiveButton: ".button_inactive",
  inputTypeError: ".popup_input-type-error",
  error: ".form__input-error_active"
};


  const userInfoHeader = (user) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImg.setAttribute(
      "style",
      `background-image: url(${user.avatar})`
    )
  };

const loadCards = (cards) => {
  cards.forEach(function (item) {
    const ownerId = item.owner._id
    const cardItem = createCard(
      item.name,
      item.link,
      item.likes,
      ownerId,
      item,
      handleDeleteButton,
      handleLikeButton,
      openPopupImg,
      userId
    );
    cardList.append(cardItem);
  });
};
const promises = [getInfoUser(), getInitialCards()];
export let userId;
Promise.all(promises)
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfoHeader(userData);
    loadCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

addCloseListeners(popupTypeEdit);
addCloseListeners(popupTypeNewCard);
addCloseListeners(popupTypeImg);
addCloseListeners(popupTypeEditImg);

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileDescription.innerText;
  clearValidation(popupEditForm, validationConfig);
  openModal(popupTypeEdit);
});

addButton.addEventListener("click", function () {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupTypeNewCard);
});
profileImg.addEventListener("click", function () {
  clearValidation(avatarEditForm, validationConfig);
  openModal(popupTypeEditImg);
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const addProfileData = {
    name: nameInput.value,
    about: jobInput.value,
}
  popupButton.textContent = "Сохранение...";
  saveEditProfile(addProfileData)
    .then((changedDataProfile) => {
      profileTitle.textContent = changedDataProfile.name;
      profileDescription.textContent = changedDataProfile.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = "Сохранить";
    });
}
popupEditForm.addEventListener("submit", handleProfileFormSubmit);

function handleUpdateProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = "Сохранение...";
  const addProfileImgData = {
    avatar: AvatarInput.value,
}
  updateEditProfile(addProfileImgData)
    .then((res) => {
      const newAvatarUrl = res.avatar;
      profileImg.setAttribute("style", `background-image: url(${newAvatarUrl})`);  
      closeModal(popupTypeEditImg);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = "Сохранить";
    });
}

avatarEditForm.addEventListener("submit", handleUpdateProfileFormSubmit);


function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const popupButton = evt.target.querySelector('.popup__button');
  popupButton.textContent = "Сохранение...";
  const addCardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
}
  getNewCard(addCardData)
   
    .then((dataCard) => {
     
      const newCard = createCard(
        dataCard.name,
        dataCard.link,
        dataCard.likes,
        dataCard.owner._id,
        dataCard,
        handleDeleteButton,
        handleLikeButton,
        openPopupImg
      );
      cardList.prepend(newCard);
      newPlaceForm.reset();
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = "Сохранить";
    });
   
}
newPlaceForm.addEventListener("submit", handleCardFormSubmit);

function openPopupImg(name, link) {
  popupCaption.textContent = name;
  popupImg.src = link;
  popupImg.alt = name;
  openModal(popupTypeImg);
}


enableValidation(validationConfig);
