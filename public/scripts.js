const mainEl = document.querySelector("main");
mainEl.addEventListener("scroll", () => {
  const buttonToTop = document.getElementById("scrollToTopBtn");
  const scrollPosition = mainEl.scrollY || mainEl.scrollTop;
  buttonToTop.addEventListener("click", () => {
    mainEl.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })
  if (scrollPosition >= 500) {
    buttonToTop.classList.remove("hidden");
    buttonToTop.classList.add("flex");
  } else {
    buttonToTop.classList.remove("flex");
    buttonToTop.classList.add("hidden");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  electronAPI.reqLoginStatus();
  electronAPI.reqNoteLists();
});
