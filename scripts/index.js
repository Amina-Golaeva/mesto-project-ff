// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardList = content.querySelector("section.places .places__list");

// @todo: Функция создания карточки
const createCard = function (name, link, deleteButton) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title")
  cardTitle.textContent = name;
  const cardImg =cardElement.querySelector(".card__image");
  cardImg.src = link;
  cardImg.alt = name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    deleteButton(cardElement);
  })
  return cardElement;
};
// @todo: Функция удаления карточки
function deleteButton(card) {
    card.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardItem = createCard(item.name, item.link, deleteButton);
  cardList.append(cardItem);
});
