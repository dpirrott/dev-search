const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    "username": form.username.value,
    "password": form.password.value,
  };

  fetch("http://127.0.0.1:8000/api/users/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access) {
        localStorage.setItem("token", data.access);
        window.location = "http://localhost:5500/frontend/projects-list.html";
      } else {
        alert("Username or password didn't work");
      }
      console.log(data);
    });
});
