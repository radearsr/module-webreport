const notesWrapper = document.querySelector("#notes-wrapper");
const addButton = notesWrapper.querySelector(".add-button");
const firstFormNote = document.querySelector("#NOTE01");
let formNotes = document.querySelectorAll(".notes-card  form");

const inputElement = document.getElementById("filterInputNotes");
const buttonElement = document.getElementById("filterButtonNotes");

buttonElement.addEventListener("click", (event) => {
  event.preventDefault();
  const searchValue = inputElement.value;
  searchCharactersInNotes(searchValue);
});

const formSubmitHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(formData);
  const title = formData.get("title");
  const contents = formData.get("contents");
  const id = formData.get("id");
  console.log(title, contents, id);
  electronAPI.reqNoteSave({ id, title, contents });
};

const formRemoveHandler = (elementContainer, title, noteId) => {
  // const resultConfirm = confirm(`Anda yakin ingin menghapus note ${title}?`);
  // electronAPI.reqSwitchToLastWindow();
  // if (resultConfirm) {
  // }
  if (noteId !== "") {
    electronAPI.reqNoteDelete(noteId);
  }
  return elementContainer.remove();
};

// addButton.addEventListener("click", () => {
//   const newCard = createCard();
//   notesWrapper.appendChild(newCard);
//   formNotes = document.querySelectorAll(".notes-card > form");
// });

const createCard = (title = "", contents = "", hiddenId = "") => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("w-1/4", "p-2", "notes-card");

  const cardContentForm = document.createElement("form");
  cardContentForm.classList.add(
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

  const removeEl = document.createElement("div");
  removeEl.classList.add("remove-note");

  cardContentForm.addEventListener("submit", formSubmitHandler);

  cardContentForm.id = `NOTE${
    formNotes.length + 1 < 10
      ? `0${formNotes.length + 1}`
      : formNotes.length + 1
  }`;

  const titleInput = document.createElement("input");
  titleInput.value = title;
  titleInput.type = "text";
  titleInput.classList.add("text-xl", "font-semibold", "mb-2", "outline-none");
  titleInput.placeholder = "Note Title";
  titleInput.setAttribute("name", "title");

  const contentTextarea = document.getElementById("contentDiv");
  contentTextarea.value = contents;
  contentTextarea.classList.add(
    "text-gray-600",
    "resize-none",
    "h-24",
    "mb-2",
    "outline-none"
  );
  contentTextarea.placeholder = "Note Content";
  contentTextarea.setAttribute("name", "contents");

  const saveButton = document.createElement("button");
  saveButton.classList.add(
    "bg-lime-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "hover:bg-lime-600"
  );
  saveButton.setAttribute("type", "submit");
  saveButton.textContent = "Save";

  const inputHidden = document.createElement("input");
  inputHidden.setAttribute("type", "hidden");
  inputHidden.setAttribute("name", "id");
  inputHidden.value = hiddenId;

  const svg = `
    <svg
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      class="w-6 h-6 absolute top-2 right-2 text-gray-500 cursor-pointer rotate-45">
      <path
        d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
        fill-rule="nonzero" />
    </svg>
  `;

  removeEl.addEventListener("click", () =>
    formRemoveHandler(cardDiv, titleInput.value, hiddenId)
  );
  removeEl.innerHTML = svg;
  cardContentForm.appendChild(removeEl);
  cardContentForm.appendChild(inputHidden);
  cardContentForm.appendChild(titleInput);
  cardContentForm.appendChild(contentTextarea);
  cardContentForm.appendChild(saveButton);

  cardDiv.appendChild(cardContentForm);

  return cardDiv;
};

firstFormNote.addEventListener("submit", formSubmitHandler);

electronAPI.resNoteLists((notes) => {
  if (notes.length) {
    notes.forEach((note, idx) => {
      if (idx < 1) {
        const title = firstFormNote.querySelector("input[name='title']");
        title.value = note.title;
        const contents = document.getElementById("contentDiv");
        contents.textContent = note.contents;
        const hidden = firstFormNote.querySelector("input[name='id']");
        hidden.value = note.id;
        return;
      }
      const newCard = createCard(note.title, note.contents, note.id);
      notesWrapper.appendChild(newCard);
    });
  }
});

const searchCharactersInNotes = (searchValue) => {
  const contents = document.getElementById("contentDiv");
  const contentValue = contents.textContent;

  if (searchValue) {
    const regex = new RegExp(searchValue, "gi");
    const highlightedContent = contentValue.replace(
      regex,
      (match) => `<span class="bg-yellow-200">${match}</span>`
    );
    contents.innerHTML = highlightedContent;
  }
};
