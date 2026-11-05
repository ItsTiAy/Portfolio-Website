import { cardInteraction } from "./cardInteraction.ts";

interface ExperienceData {
  id: number;
  date: string;
  role: string;
  company: string;
  description: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  playable?: string;
  source?: string;
  imgSource?: string;
}

async function getArray<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.statusText}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(`Invalid data format in ${url}: expected an array`);
  }

  return data as T[];
}

function getTemplateAndContainer(
  templateId: string,
  containerSelector: string,
): { template: HTMLTemplateElement; container: HTMLElement } {
  const template = document.getElementById(templateId);
  const container = document.querySelector<HTMLElement>(containerSelector);

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Template not found: #${templateId}`);
  }
  if (!container) {
    throw new Error(`Container not found: ${containerSelector}`);
  }

  return { template, container };
}

function query<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T {
  const el = root.querySelector<T>(selector);
  if (!el) {
    throw new Error(`Missing element in template: ${selector}`);
  }
  return el;
}

function setOrRemove<T extends HTMLElement>(
  el: T | null,
  value: string | undefined,
  apply: (el: T, value: string) => void,
): void {
  if (!el) return;
  if (value) {
    apply(el, value);
  } else {
    el.remove();
  }
}

function updateExperience(root: ParentNode, experience: ExperienceData): void {
  query(root, ".date").textContent = experience.date;
  query(root, ".role").textContent = experience.role;
  query(root, ".company").textContent = experience.company;
  query(root, ".description").textContent = experience.description;
}

function updateProject(root: ParentNode, project: ProjectData): void {
  query(root, ".title").textContent = project.title;
  query(root, ".description").textContent = project.description;

  setOrRemove(
    root.querySelector<HTMLAnchorElement>(".playable"),
    project.playable,
    (el, value) => {
      el.href = value;
    },
  );

  setOrRemove(
    root.querySelector<HTMLAnchorElement>(".source"),
    project.source,
    (el, value) => {
      el.href = value;
    },
  );

  setOrRemove(
    root.querySelector<HTMLImageElement>(".background-img"),
    project.imgSource,
    (el, value) => {
      el.src = value;
      el.alt = project.title;
      el.loading = "lazy";
    },
  );
}

interface RenderListOptions<T> {
  url: string;
  templateId: string;
  containerSelector: string;
  update: (root: ParentNode, item: T) => void;
  errorMessage: string;
}

async function renderList<T>(opts: RenderListOptions<T>): Promise<void> {
  const { template, container } = getTemplateAndContainer(
    opts.templateId,
    opts.containerSelector,
  );

  let data: T[];
  try {
    data = await getArray<T>(opts.url);
  } catch (error) {
    const message = document.createElement("p");
    message.className = "load-error";
    message.textContent = opts.errorMessage;
    container.replaceChildren(message);
    throw error;
  }

  const fragment = document.createDocumentFragment();
  for (const item of [...data].reverse()) {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    opts.update(clone, item);
    fragment.appendChild(clone);
  }

  container.replaceChildren(fragment);
}

export async function loadData(): Promise<void> {
  const results = await Promise.allSettled([
    renderList<ExperienceData>({
      url: "/experience.json",
      templateId: "experience-template",
      containerSelector: ".experience-wrapper",
      update: updateExperience,
      errorMessage: "Couldn't load experience.",
    }),
    renderList<ProjectData>({
      url: "/projects.json",
      templateId: "project-template",
      containerSelector: ".project-wrapper",
      update: updateProject,
      errorMessage: "Couldn't load projects.",
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Section failed to load:", result.reason);
    }
  }

  cardInteraction.observe(document.querySelectorAll<HTMLElement>(".card"));
}
