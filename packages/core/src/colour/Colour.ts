import { RgbColour, HslColour, ColourArray } from "./types";

export class Colour implements RgbColour {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromHex(hex: string): Colour {
    const clean = hex.trim().replace(/^#/, "");
    const size = clean.length / 3;
    const [r, g, b] = Array(3)
      .fill(null)
      .map((x, i) => clean.slice(i * size, (i + 1) * size))
      .map(x => parseInt(x, 16));

    return this.fromRgbArray([r, g, b]);
  }

  static fromRgbArray([r, g, b]: ColourArray): Colour {
    return new this(r, g, b);
  }

  static fromRgbObject({ r, g, b }: RgbColour): Colour {
    return new this(r, g, b);
  }

  static fromHslArray([h, s, l]: ColourArray): Colour {
    const H = (h + 360) % 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
    const m = l - c / 2;
    let [r, g, b]: ColourArray = [0, 0, 0];
    switch (true) {
      case 0 <= H && H < 60:
        [r, g, b] = [c, x, 0];
        break;
      case 60 <= H && H < 120:
        [r, g, b] = [x, c, 0];
        break;
      case 120 <= H && H < 180:
        [r, g, b] = [0, c, x];
        break;
      case 180 <= H && H < 240:
        [r, g, b] = [0, x, c];
        break;
      case 240 <= H && H < 300:
        [r, g, b] = [x, 0, c];
        break;
      case 300 <= H && H < 360:
        [r, g, b] = [c, 0, x];
        break;
      default:
        throw new Error(`Error in HSL to RGB conversion (h=${H})`);
    }
    const [R, G, B] = [r, g, b].map(n => Math.round((n + m) * 255));
    return new this(R, G, B);
  }

  toRgbObject(): RgbColour {
    return { r: this.r, g: this.g, b: this.b };
  }

  toRgbArray(): ColourArray {
    return [this.r, this.g, this.b];
  }

  toHex(
    prefix: string = "#",
    separator: string = "",
    suffix: string = "",
    radix: number = 16
  ): string {
    const hexParts = this.toRgbArray().map(x =>
      x.toString(radix).padStart(2, "0")
    );
    return [prefix, hexParts.join(separator), suffix].join("");
  }

  toRgbCssString(): string {
    return this.toHex("rgb(", ", ", ")", 10);
  }

  toHslArray(): ColourArray {
    const [r, g, b] = this.toRgbArray().map(x => x / 255);
    const [cMax, cMin] = [Math.max, Math.min].map(f => f(r, g, b));
    const delta = cMax - cMin;
    let hue: number;
    if (!delta) {
      hue = 0;
    } else {
      switch (cMax) {
        case r:
          hue = 60 * (((g - b) / delta) % 6);
          break;
        case g:
          hue = 60 * ((b - r) / delta + 2);
          break;
        case b:
          hue = 60 * ((r - g) / delta + 4);
          break;
        default:
          throw new Error("RGB to HSL calculation broken");
      }
    }
    const lightness = (cMax + cMin) / 2;
    const saturation = delta ? delta / (1 - Math.abs(2 * lightness + 1)) : 0;
    return [hue, saturation, lightness];
  }

  toHslObject(): HslColour {
    const [h, s, l] = this.toHslArray();
    return { h, s, l };
  }

  saturate(saturation: number): Colour {
    const [h, s, l] = this.toHslArray();
    return Colour.fromHslArray([h, saturation, l]);
  }

  lighten(amount: number): Colour {
    const [r, g, b] = this.toRgbArray();
    const [R, G, B] = [r, g, b].map(c => Math.round(c + (255 - c) * amount));
    return Colour.fromRgbArray([R, G, B]);
  }

  darken(amount: number): Colour {
    const [r, g, b] = this.toRgbArray();
    const [R, G, B] = [r, g, b].map(c => Math.round(c * (1 - amount)));
    return Colour.fromRgbArray([R, G, B]);
  }

  blend(colour: Colour): Colour {
    const [r1, g1, b1] = this.toRgbArray();
    const [r2, g2, b2] = colour.toRgbArray();
    const [r3, g3, b3] = [[r1, r2], [g1, g2], [b1, b2]].map(([a, b]) =>
      Math.round((a + b) / 2)
    );
    return Colour.fromRgbArray([r3, g3, b3]);
  }
}
