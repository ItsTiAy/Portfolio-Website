type ExperienceData = {
  id: number;
  date: string;
  role: string;
  company: string;
  description: string;
};

type ProjectData = {
  id: number;
  title: string;
  description: string;
  playable: string;
  source: string;
  imgSource: string;
};

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load JSON");
  return response.json();
}

function cloneTemplate(templateId: string, containerSelector: string) {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  const container = document.querySelector(containerSelector) as HTMLDivElement;
  return { template, container };
}

async function loadExperience() {
  const data = await getData<ExperienceData[]>("/experience.json");
  const { template, container } = cloneTemplate(
    "experience-template",
    ".experience-wrapper",
  );

  data.toReversed().forEach((experience) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    (clone.querySelector(".date") as HTMLElement).textContent = experience.date;
    (clone.querySelector(".role") as HTMLElement).textContent = experience.role;
    (clone.querySelector(".company") as HTMLElement).textContent =
      experience.company;
    (clone.querySelector(".description") as HTMLElement).textContent =
      experience.description;
    container.appendChild(clone);
  });
}

async function loadProjects() {
  const data = await getData<ProjectData[]>("/projects.json");
  const { template, container } = cloneTemplate(
    "project-template",
    ".project-wrapper",
  );

  data.toReversed().forEach((project) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    (clone.querySelector(".title") as HTMLElement).textContent = project.title;
    (clone.querySelector(".description") as HTMLElement).textContent =
      project.description;

    const playable = clone.querySelector(".playable") as HTMLAnchorElement;
    if (project.playable) playable.href = project.playable;
    else playable.remove();

    const source = clone.querySelector(".source") as HTMLAnchorElement;
    if (project.source) source.href = project.source;
    else source.remove();

    const backgroundImg = clone.querySelector(
      ".background-img",
    ) as HTMLImageElement;
    if (project.imgSource) backgroundImg.src = project.imgSource;
    else backgroundImg.remove();

    container.appendChild(clone);
  });
}

function loadData() {
  loadExperience();
  loadProjects();
}

loadData();
