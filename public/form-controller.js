const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusBullet = form.parentElement.querySelector("span:first-child");
    const buttonSubmit = form.parentElement.querySelector("button[type='submit']");
    console.log(statusBullet);
    console.log(buttonSubmit);
    const formData = new FormData(form);
    const formId = form.getAttribute("id");
    const username = formData.get("username");
    const password = formData.get("password");
    console.log({
      formId,
      username,
      password,
    });
  });
});