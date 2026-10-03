export class CenterHighlighter {
  private observer: IntersectionObserver;
  private active: HTMLElement | null = null;
  private activeClass: string;
  private media: MediaQueryList;

  constructor(activeClass = "in-view") {
    this.activeClass = activeClass;
    this.media = window.matchMedia("(max-width: 768px)");
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.active?.classList.remove(this.activeClass);
          this.active = entry.target as HTMLElement;
          this.active.classList.add(this.activeClass);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
  }

  observe(cards: ArrayLike<HTMLElement>) {
    if (!this.media.matches) return;
    Array.from(cards).forEach((card) => this.observer.observe(card));
  }

  destroy() {
    this.observer.disconnect();
  }
}

export const cardInteraction = new CenterHighlighter();
