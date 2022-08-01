const projectsUrl = "http://127.0.0.1:8000/api/projects/";

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
              <strong class="vote--option">&#43;</strong>
              <strong class="vote--option">&#8722;</strong>
            </div>

            <i>${project.vote_ratio}</i>
            <p>${project.description.substring(0, 150)}</p>
          </div>

        </div>
    `;
    projectsWrapper.innerHTML += projectCard;
  }
};

getProjects();
