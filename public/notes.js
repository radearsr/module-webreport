const firstFormNote = document.querySelector("#NOTE01");

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
  const title = formData.get("title");
  const contents = formData.get("contents");
  const id = formData.get("id");
  console.log({ id, title, contents });
  electronAPI.reqNoteSave({ id, title, contents });
};


firstFormNote.addEventListener("submit", formSubmitHandler);

electronAPI.resNoteLists((resNotes) => {
  if (!resNotes.length) return false;
  const heightPerOneLine = 40;
  const [note] = resNotes;
  const title = firstFormNote.querySelector("input[name='title']");
  title.value = note.title;
  const contents = document.getElementById("contentTextArea");
  const contentLength = note.contents.length;
  const adjustHeight = contentLength / 160;
  if (contentLength > 420) {
    contents.style.height = `${(heightPerOneLine * adjustHeight)}px`;
  }
  contents.value = note.contents;
  const hidden = firstFormNote.querySelector("input[name='id']");
  hidden.value = note.id;
});

const createDIVForResultSearch = (contentHTML, width, height) => {
  console.log("Create El");
  console.log({ width, height });
  const div = document.createElement("div");
  div.setAttribute("class", `text-gray-600 mb-2 outline-none break-all whitespace-pre-line p-2`);
  div.setAttribute("id", "textResultFilter");
  div.style.width = `${Math.ceil(width)}px`;
  div.style.height = `${Math.ceil(height)}px`;
  div.innerHTML = contentHTML;
  return div;
};

const searchCharactersInNotes = (searchValue) => {
  const contentTextArea = document.getElementById("contentTextArea");
  const contentValue = contentTextArea.value;
  console.log(searchValue);

  if (!searchValue) {
    return contentTextArea.classList.remove("hidden");
  }

  const regex = new RegExp(searchValue, "gi");
  const highlightedContent = contentValue.replace(
    regex,
    (match) => `<span class="bg-yellow-200">${match}</span>`
  );

  const resultFilter = document.querySelector("#textResultFilter");
  if (resultFilter) {
    return resultFilter.innerHTML = highlightedContent;
  }
  const { width, height } = contentTextArea.getBoundingClientRect();
  contentTextArea.classList.add("hidden");


  const elResultSearch = createDIVForResultSearch(highlightedContent, width, height);
  elResultSearch.addEventListener("click", (event) => {
    contentTextArea.classList.remove("hidden");
    console.log(event.target);
    elResultSearch.remove();
  });
  contentTextArea.insertAdjacentElement("afterend", elResultSearch);
};


const textAreaContent = document.getElementById("contentTextArea");
const checkOverflow = () => {
  if (textAreaContent.scrollHeight > textAreaContent.clientHeight) {
    const { height } = textAreaContent.getBoundingClientRect();
    textAreaContent.style.height = `${height + 45}px`;
  }
}
textAreaContent.addEventListener("input", checkOverflow);
textAreaContent.addEventListener("keydown", checkOverflow);
textAreaContent.addEventListener("paste", checkOverflow);