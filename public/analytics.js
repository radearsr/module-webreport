const sortings = document.querySelectorAll(".sorting");

sortings.forEach((sorting) => {
  sorting.addEventListener("click", (e) => {
    const name = e.target.textContent;
    electronAPI.reqPriceLists(name);
  });
});

electronAPI.resPriceLists((data) => {
  console.log("TEST");
  console.log(data);
});