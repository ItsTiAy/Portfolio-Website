function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function convertToLinear(r: number, g: number, b: number) {
  return {
    red: srgbToLinear(r),
    green: srgbToLinear(g),
    blue: srgbToLinear(b),
  };
}

export function parseRGB(cssColor: string): [number, number, number] {
  const [r, g, b] = cssColor.match(/\d+/g)!.map(Number);
  return [r, g, b];
}
