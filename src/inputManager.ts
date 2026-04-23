export interface InputState {
  x: number;
  y: number;
}

export class InputManager {
  public state: InputState = { x: 0.5, y: 0.5 };
  private initialOrientation = { beta: 0, gamma: 0 };
  private hasReference = false;

  public isDesktop = window.matchMedia("(pointer: fine)").matches;

  constructor() {
    if (this.isDesktop) {
      window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    } else {
      window.addEventListener("deviceorientation", (e) =>
        this.handleOrientation(e),
      );
    }
  }

  private handleMouseMove(e: MouseEvent) {
    this.state.x = e.clientX / window.innerWidth;
    this.state.y = 1 - e.clientY / window.innerHeight;
  }

  private handleOrientation(e: DeviceOrientationEvent) {
    if (e.beta === null || e.gamma === null) return;

    if (!this.hasReference) {
      this.initialOrientation.beta = e.beta;
      this.initialOrientation.gamma = e.gamma;
      this.hasReference = true;
    }

    const deltaBeta = e.beta - this.initialOrientation.beta;
    const deltaGamma = e.gamma - this.initialOrientation.gamma;

    const maxTilt = 30;

    this.state.x = Math.max(0, Math.min(1, (deltaGamma / maxTilt + 1) / 2));
    this.state.y = 1 - Math.max(0, Math.min(1, (deltaBeta / maxTilt + 1) / 2));
  }

  public async requestAccess(): Promise<boolean> {
    if (this.isDesktop) return true;

    const devOrient = DeviceOrientationEvent as any;
    if (typeof devOrient.requestPermission === "function") {
      const status = await devOrient.requestPermission();
      return status === "granted";
    }
    return true;
  }
}

export const inputManager = new InputManager();
