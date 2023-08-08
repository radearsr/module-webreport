const notesSection = document.querySelector("#notes-card");
const addButton = notesSection.querySelector(".add-button");

const saveButton = document.querySelector("#saveButton");
const titleInput = document.querySelector("#titleInput");
const contentTextarea = document.querySelector("#contentTextarea");

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const content = contentTextarea.value;

  const noteData = {
    title: title,
    content: content,
  };
  console.log(noteData);
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newCard = createCard();
  notesSection.appendChild(newCard);
});

const createCard = () => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("w-1/4", "p-2");

  const cardContentDiv = document.createElement("div");
  cardContentDiv.classList.add(
    "flex",
    "flex-col",
    "border",
    "border-collapse",
    "shadow",
    "w-full",
    "rounded",
    "p-4",
    "relative"
  );

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.classList.add("text-xl", "font-semibold", "mb-2", "outline-none");
  titleInput.placeholder = "Note Title";
  titleInput.id = "titleInput";

  const contentTextarea = document.createElement("textarea");
  contentTextarea.classList.add(
    "text-gray-600",
    "resize-none",
    "h-24",
    "mb-2",
    "outline-none"
  );
  contentTextarea.placeholder = "Note Content";
  contentTextarea.id = "contentTextarea";

  const saveButton = document.createElement("button");
  saveButton.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "hover:bg-blue-600"
  );
  saveButton.textContent = "Save";
  saveButton.id = "saveButton";

  cardContentDiv.appendChild(titleInput);
  cardContentDiv.appendChild(contentTextarea);
  cardContentDiv.appendChild(saveButton);

  cardDiv.appendChild(cardContentDiv);

  return cardDiv;
};
