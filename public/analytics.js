const sortings = document.querySelectorAll(".sorting");

console.log(sortings);

sortings.forEach((sorting) => {
  sorting.addEventListener("click", (e) => {
    const name = e.target.textContent;
    electronAPI.reqPriceLists(name);
  });
});