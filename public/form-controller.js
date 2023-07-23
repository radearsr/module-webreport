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
      electronAPI.sendFormData({ formId, username, password });
    } catch (error) {
      console.error("Gagal mengirim data form melalui IPC:", error);
    }
  });
});

electronAPI.onLoginSuccess((data) => {
  const form = document.getElementById(data.formId);
  const statusBullet = form.parentElement.querySelector("span:first-child");
  statusBullet.classList.remove("bg-slate-300");
  statusBullet.classList.add("bg-lime-500");
});

electronAPI.resLoginStatus((lists) => {
  if (lists.length < 1) return false;
  lists.forEach((list) => {
    let form = document.getElementById(list.title);
    let username = form.querySelector("input[name='username']");
    let password = form.querySelector("input[name='password']");
    let statusBullet = form.parentElement.querySelector("span:first-child");

    username.value = list.username;
    password.value = list.password;

    if (list.status === 0) {
      statusBullet.classList.remove("bg-lime-500");
      statusBullet.classList.add("bg-slate-300");
    } else {
      statusBullet.classList.remove("bg-slate-300");
      statusBullet.classList.add("bg-lime-500");
    }
  });
});