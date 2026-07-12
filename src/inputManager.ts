const MAX_TILT = 30;

export interface InputState {
  x: number;
  y: number;
}

function eulerToQuat(beta: number, gamma: number) {
  const toRad = Math.PI / 180;
  const b = (beta * toRad) / 2;
  const g = (gamma * toRad) / 2;

  return {
    x: Math.sin(b) * Math.cos(g),
    y: Math.cos(b) * Math.sin(g),
    z: -Math.sin(b) * Math.sin(g),
    w: Math.cos(b) * Math.cos(g),
  };
}

function multiplyQuat(
  a: { x: number; y: number; z: number; w: number },
  b: { x: number; y: number; z: number; w: number },
) {
  return {
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  };
}

function invertQuat(q: { x: number; y: number; z: number; w: number }) {
  return { x: -q.x, y: -q.y, z: -q.z, w: q.w };
}

export class InputManager {
  public state: InputState = { x: 0.5, y: 0.5 };
  public isDesktop = window.matchMedia("(pointer: fine)").matches;
  private referenceQuat: { x: number; y: number; z: number; w: number } | null =
    null;
  private target: InputState = { x: 0.5, y: 0.5 };
  private smoothing: number;

  private static readonly REFERENCE_DT = 1 / 60;

  constructor(smoothing = 0.1) {
    this.smoothing = Math.max(0, Math.min(0.999, smoothing));

    if (this.isDesktop) {
      window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    } else {
      window.addEventListener("deviceorientation", (e) =>
        this.handleOrientation(e),
      );
    }
  }

  public update(dt: number) {
    if (this.smoothing <= 0) {
      this.state.x = this.target.x;
      this.state.y = this.target.y;
      return;
    }

    const framesElapsed = dt / InputManager.REFERENCE_DT;
    const alpha = 1 - Math.pow(1 - this.smoothing, framesElapsed);

    this.state.x += (this.target.x - this.state.x) * alpha;
    this.state.y += (this.target.y - this.state.y) * alpha;
  }

  private setTarget(x: number, y: number) {
    this.target.x = x;
    this.target.y = y;
  }

  private handleMouseMove(e: MouseEvent) {
    const x = e.clientX / window.innerWidth;
    const y = 1 - e.clientY / window.innerHeight;

    this.setTarget(x, y);
  }

  private handleOrientation(e: DeviceOrientationEvent) {
    if (e.beta === null || e.gamma === null) return;

    const current = eulerToQuat(e.beta, e.gamma);

    if (!this.referenceQuat) {
      this.referenceQuat = invertQuat(current);
      return;
    }

    const delta = multiplyQuat(this.referenceQuat, current);
    const tiltX = 2 * (delta.x * delta.z + delta.w * delta.y);
    const tiltY = 2 * (delta.y * delta.z - delta.w * delta.x);
    const maxTilt = Math.sin((MAX_TILT * Math.PI) / 180);
    const x = Math.max(0, Math.min(1, (tiltX / maxTilt + 1) / 2));
    const y = Math.max(0, Math.min(1, (tiltY / maxTilt + 1) / 2));

    this.setTarget(x, y);
  }
}

export const inputManager = new InputManager();
