// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardList = content.querySelector("section.places .places__list");

// @todo: Функция создания карточки
const addCard = function (name, link, deleteButton) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteButton);
  return cardElement;
};
// @todo: Функция удаления карточки
function deleteButton(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardItem = addCard(item.name, item.link, deleteButton);
  cardList.append(cardItem);
});
