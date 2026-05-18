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
  private referenceQuat: { x: number; y: number; z: number; w: number } | null =
    null;
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

    const current = eulerToQuat(e.beta, e.gamma);

    if (!this.referenceQuat) {
      this.referenceQuat = invertQuat(current);
      return;
    }

    const delta = multiplyQuat(this.referenceQuat, current);

    const tiltX = 2 * (delta.x * delta.z + delta.w * delta.y);
    const tiltY = 2 * (delta.y * delta.z - delta.w * delta.x);

    const maxTilt = Math.sin((MAX_TILT * Math.PI) / 180);

    this.state.x = Math.max(0, Math.min(1, (tiltX / maxTilt + 1) / 2));
    this.state.y = Math.max(0, Math.min(1, (tiltY / maxTilt + 1) / 2));
  }

  // public async requestAccess(): Promise<boolean> {
  //   if (this.isDesktop) return true;
  //   const devOrient = DeviceOrientationEvent as any;
  //   if (typeof devOrient.requestPermission === "function") {
  //     const status = await devOrient.requestPermission();
  //     return status === "granted";
  //   }
  //   return true;
  // }
}

export const inputManager = new InputManager();
