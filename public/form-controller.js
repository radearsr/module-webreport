const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const buttonSubmit = form.parentElement.querySelector(
      "button[type='submit']"
    );
    const formData = new FormData(form);
    const formId = form.getAttribute("id");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      window.electronAPI.sendFormData({ formId, username, password });
    } catch (error) {
      console.error("Gagal mengirim data form melalui IPC:", error);
    }
  });
});

electronAPI.onLoginSuccess((data) => {
  console.log(data);
  const form = document.getElementById(data.formId);
  const statusBullet = form.parentElement.querySelector("span:first-child");
  console.log(data);
  statusBullet.classList.remove("bg-slate-300");
  statusBullet.classList.add("bg-lime-500");
  console.log("Login Success");
});
