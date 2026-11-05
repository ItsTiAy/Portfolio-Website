async function getSplash(): Promise<string> {
  const response = await fetch("/splash.json");
  if (!response.ok) throw new Error("Failed to load splash options");

  const data = await response.json();

  if (!data.values || !Array.isArray(data.values) || data.values.length === 0) {
    throw new Error("Invalid or empty splash options in JSON");
  }

  return data.values[Math.floor(Math.random() * data.values.length)];
}

export function loadSplash() {
  const splashHTML = document.querySelector(
    ".hero-splash",
  ) as HTMLDivElement | null;

  if (!splashHTML) {
    console.error("Could not find .hero-splash element in the DOM");
    return;
  }

  getSplash()
    .then((randomOption) => (splashHTML.textContent = randomOption))
    .catch((error) => {
      console.error("Failed to load splash:", error);
      splashHTML.textContent = "Welcome!";
    });
}
