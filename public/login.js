const forms = document.querySelectorAll("#login > form:not(form#filterData)");
const passwordViews = document.querySelectorAll(".password-view");

passwordViews.forEach((passView) => {
  passView.addEventListener("click", (event) => {
    const currentAttr = event.target.previousElementSibling.getAttribute("type");
    if (currentAttr === "password") {
      event.target.style.backgroundImage = "url('hide.png')";
      event.target.previousElementSibling.setAttribute("type", "text");
      return;
    }
    event.target.style.backgroundImage = "url('view.png')";
    event.target.previousElementSibling.setAttribute("type", "password");
  });
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let buttonLogin = form.querySelector('button[data-status="login"');
    buttonLogin.classList.remove("bg-lime-400");
    buttonLogin.classList.remove("hover:bg-lime-500");
    buttonLogin.classList.add("bg-slate-300");
    buttonLogin.disabled = true;

    const formData = new FormData(form);
    const formId = form.getAttribute("id");
    const formAction = form.dataset.formAction;
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(formId, username, password);
    if (formAction === "login") {
      electronAPI.reqLoginAuth({ formId, username, password });
    } else {
      electronAPI.reqLogoutAuth({ formId });
    }
  });
});

electronAPI.resLoginAuth((data) => {
  const form = document.getElementById(data.formId);
  const statusBullet = form.parentElement.querySelector("span:first-child");
  let username = form.querySelector("input[name='username']");
  let password = form.querySelector("input[name='password']");
  let buttonLogin = form.querySelector('button[data-status="login"');
  let buttonLogout = form.querySelector('button[data-status="logout"');

  form.dataset.formAction = "logout";

  buttonLogin.classList.remove("block");
  buttonLogin.classList.add("hidden");
  buttonLogout.classList.remove("hidden");
  buttonLogout.classList.add("block");

  statusBullet.classList.remove("bg-slate-300");
  statusBullet.classList.add("bg-lime-500");

  username.disabled = true;
  username.classList.add("bg-gray-200");
  password.disabled = true;
  password.classList.add("bg-gray-200");
});


electronAPI.resLogoutAuth((data) => {
  const form = document.getElementById(data.formId);
  const statusBullet = form.parentElement.querySelector("span:first-child");
  let username = form.querySelector("input[name='username']");
  let password = form.querySelector("input[name='password']");
  let buttonLogin = form.querySelector('button[data-status="login"');
  let buttonLogout = form.querySelector('button[data-status="logout"');

  form.dataset.formAction = "login";

  buttonLogin.classList.remove("hidden");
  buttonLogin.classList.add("block");
  buttonLogin.classList.remove("bg-slate-300");
  buttonLogin.classList.add("bg-lime-400");
  buttonLogin.classList.add("hover:bg-lime-500");
  buttonLogin.disabled = false;

  buttonLogout.classList.add("hidden");
  buttonLogout.classList.remove("block");

  statusBullet.classList.remove("bg-lime-500");
  statusBullet.classList.add("bg-slate-300");

  username.disabled = false;
  username.classList.remove("bg-gray-200");
  password.disabled = false;
  password.classList.remove("bg-gray-200");
});

electronAPI.resLoginStatus((lists) => {
  if (lists.length < 1) return false;
  lists.forEach((list) => {
    let form = document.getElementById(list.title);
    let username = form.querySelector("input[name='username']");
    let password = form.querySelector("input[name='password']");
    let statusBullet = form.parentElement.querySelector("span:first-child");
    let buttonLogin = form.querySelector('button[data-status="login"');
    let buttonLogout = form.querySelector('button[data-status="logout"');

    username.value = list.username;
    password.value = list.password;

    if (list.status === 0) {
      form.dataset.formAction = "login";

      buttonLogin.classList.remove("hidden");
      buttonLogin.classList.add("block");
      buttonLogin.classList.remove("bg-slate-300");
      buttonLogin.classList.add("bg-lime-400");
      buttonLogin.classList.add("hover:bg-lime-500");
      buttonLogin.disabled = false;

      buttonLogout.classList.add("hidden");
      buttonLogout.classList.remove("block");

      statusBullet.classList.remove("bg-lime-500");
      statusBullet.classList.add("bg-slate-300");

      username.disabled = false;
      username.classList.remove("bg-gray-200");
      password.disabled = false;
      password.classList.remove("bg-gray-200");
    } else {
      form.dataset.formAction = "logout";

      buttonLogin.classList.remove("block");
      buttonLogin.classList.add("hidden");
      buttonLogin.classList.add("bg-slate-300");
      buttonLogin.disabled = true;

      buttonLogout.classList.remove("hidden");
      buttonLogout.classList.add("block");

      statusBullet.classList.remove("bg-slate-300");
      statusBullet.classList.add("bg-lime-500");

      username.disabled = true;
      username.classList.add("bg-gray-200");
      password.disabled = true;
      password.classList.add("bg-gray-200");
    }
  });
});
