const projectsUrl = "http://127.0.0.1:8000/api/projects/";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const token = localStorage.getItem("token");

if (token) {
  loginBtn.remove();
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "http://localhost:5500/frontend/login.html";
  });
} else {
  logoutBtn.remove();
}

const getProjects = () => {
  fetch(projectsUrl)
    .then((res) => res.json())
    .then((data) => {
      buildProjects(data);
    });
};

const buildProjects = (projects) => {
  const projectsWrapper = document.getElementById("projects-wrapper");
  for (const project of projects) {
    const projectCard = `
        <div class="project--card">
          <img src="http://127.0.0.1:8000${project.featured_image}" />

          <div>
            <div class="card--header">
              <h3>${project.title}</h3>
              <strong class="vote--option" data-vote="up" data-project="${
                project.id
              }">&#43;</strong>
              <strong class="vote--option" data-vote="down" data-project="${
                project.id
              }">&#8722;</strong>
            </div>

            <i>${project.vote_ratio}</i>
            <p>${project.description.substring(0, 150)}</p>
          </div>

        </div>
    `;
    projectsWrapper.innerHTML += projectCard;
  }

  addVoteEvents();
};

const addVoteEvents = () => {
  const voteBtns = document.getElementsByClassName("vote--option");

  for (const btn of voteBtns) {
    btn.addEventListener("click", (e) => {
      const vote = e.target.dataset["vote"];
      const project = e.target.dataset["project"];

      fetch(`http://127.0.0.1:8000/api/projects/${project}/vote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NDEwNzY5LCJpYXQiOjE2NTkzOTI3NjksImp0aSI6IjQ3NThhMTU0YjcyZjQ4ZTg4NTU2ZmQwZDU0NWQ3NjEyIiwidXNlcl9pZCI6MX0.2ClXHOS-e5C2z3o9sRqJs4SmLVwc26SXx_S0ydJ7PvY",
        },
        body: JSON.stringify({ "value": vote }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA:", data);
        });
    });
  }
};

getProjects();
