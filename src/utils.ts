export function getComputedColourStyle(colour: string) {
  const rgb = colour.match(/\d+/g)!.map(Number);
  const linear = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const c = rgb[i] / 255.0;

    if (c <= 0.04045) {
      linear[i] = c * 0.0773993808;
    } else {
      linear[i] = Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
    }
  }

  return linear;
}
