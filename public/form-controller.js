const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusBullet = form.parentElement.querySelector("span:first-child");
    const buttonSubmit = form.parentElement.querySelector(
      "button[type='submit']"
    );
    console.log(statusBullet);
    console.log(buttonSubmit);
    const formData = new FormData(form);
    const formId = form.getAttribute("id");
    const username = formData.get("username");
    const password = formData.get("password");
    // console.log({
    //   formId,
    //   username,
    //   password,
    // });
    try {
      window.electronAPI.sendFormData({ formId, username, password });
    } catch (error) {
      console.error("Gagal mengirim data form melalui IPC:", error);
    }
  });
});
window.electronAPI.onPriceLists((priceListsData) => {
  console.log(priceListsData);
});

window.electronAPI.onError((errorMessage) => {
  console.error(errorMessage);
});
