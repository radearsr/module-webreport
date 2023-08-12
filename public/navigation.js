const navbarItems = document.querySelectorAll(".nav-item");
const navbar = document.querySelector("nav");
const sections = document.querySelectorAll("section");

const setSectionActive = (currentPage, className) => {
  sections.forEach((section) => {
    if (currentPage === section.id) {
      section.classList.remove(className);
    } else {
      section.classList.add(className);
    }
  });
};

const setNavbarItemActive = (anchorEl, bgClassName, fgDefault, fgActive) => {
  navbarItems.forEach((navbarItem) => {
    navbarItem.querySelector("a").classList.remove(bgClassName);
    anchorEl.querySelectorAll("span")[1].classList.remove(fgDefault);
  });
  anchorEl.classList.add(bgClassName);
  anchorEl.querySelectorAll("span")[1].classList.add(fgActive);
};

const setTextItemActive = (activeSpan, fgDefault, fgActive) => {
  const spans = navbar.querySelectorAll("span:last-of-type");
  spans.forEach((span) => {
    span.classList.remove(fgDefault);
  });
  spans.forEach((span) => {
    span.classList.remove(fgActive);
    span.classList.add(fgDefault);
  });
  activeSpan.classList.add(fgActive);
};

const setSvgItemActive = (activeSvg, fillDefault, fillActive) => {
  const svgs = navbar.querySelectorAll("svg");
  svgs.forEach((svg) => {
    svg.setAttribute("fill", fillDefault);
  });
  activeSvg.setAttribute("fill", fillActive);
};

navbarItems.forEach((navbarItem) => {
  navbarItem.addEventListener("click", () => {
    electronAPI.reqLoginStatus();
    const currentPage = navbarItem
      .querySelector("a")
      .getAttribute("href")
      .split("#")[1];
    const anchorEl = navbarItem.querySelector("a");
    const currentSvg = navbarItem.querySelector("svg");
    const currentPageSpan = anchorEl.querySelector("span:last-of-type");
    setNavbarItemActive(anchorEl, "bg-lime-500");
    setTextItemActive(currentPageSpan, "text-neutral-500", "text-white");
    setSvgItemActive(currentSvg, "rgb(163 230 53)", "rgb(255 255 255)");
    setSectionActive(currentPage, "hidden");
  });
});
