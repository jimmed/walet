import { ColourScheme } from "../../types";
import { ColourSchemeBackend } from "../types";
import { spawn } from "./spawn";
import { getImageMagick } from "./imageMagick";
import { Colour } from "../../colour";

const LIGHT_GREY = Colour.fromHex("EEE");

/**
 * This is a rough port of the wal backend from pywal.
 *
 * @see https://github.com/dylanaraps/pywal/blob/master/pywal/backends/wal.py
 */
export class WalColourSchemeBackend implements ColourSchemeBackend {
  magickCommand: string[];
  constructor(magickCommand?: string[]) {
    this.magickCommand = magickCommand;
  }

  parseMagickOutput(output: string[]): string[] {
    return output
      .map(line => line.trim())
      .filter(line => !line.startsWith("#"))
      .map(line => line.match(/#[A-F0-9]{6}/))
      .filter(Boolean)
      .map(([match]) => match);
  }

  async getMagickCommand(): Promise<string[]> {
    if (!this.magickCommand) {
      this.magickCommand = await getImageMagick();
    }
    return this.magickCommand;
  }

  async runMagick(args: string[], stdin: Buffer): Promise<string> {
    const [command, ...magickArgs] = await this.getMagickCommand();
    const cmdArgs = [...magickArgs, ...args];

    return spawn(command, cmdArgs, stdin);
  }

  async generate(
    buffer: Buffer,
    light: boolean = false
  ): Promise<ColourScheme> {
    let results = [];
    let i = 15;
    do {
      const colourCount = ++i;
      if (colourCount > 35) {
        throw new Error("ImageMagick couldn't generate a suitable palette");
      }
      if (colourCount > 16 && results.length <= 16) {
        console.warn("ImageMagick couldn't generate a palette");
        console.warn(`Trying palette size: ${colourCount}`);
      }
      const result = await this.runMagick(
        [
          "-",
          "-size",
          "25%",
          "-colors",
          colourCount.toString(),
          "-unique-colors",
          "txt:-"
        ],
        buffer
      );
      results = result.split(/\r?\n/g);
    } while (results.length <= 16);

    const rawColours = this.parseMagickOutput(results).map(hex =>
      Colour.fromHex(hex)
    );

    const colours = this.adjustColours(rawColours, light);

    return { light, colours };
  }

  adjustColours(raw: Colour[], light: boolean = false): Colour[] {
    const selected = [
      ...raw.slice(0, 1),
      ...raw.slice(8, 16),
      ...raw.slice(8, -1)
    ];
    return light
      ? this.adjustColoursLight(raw, selected)
      : this.adjustColoursDark(raw, selected);
  }

  adjustColoursLight(raw: Colour[], selected: Colour[]): Colour[] {
    const out = selected.map(x => x.saturate(0.5));

    out[0] = out[out.length - 1].lighten(0.85);
    out[7] = raw[0];
    out[8] = out[out.length - 1].darken(0.4);
    out[15] = raw[0];

    return out;
  }

  adjustColoursDark(raw: Colour[], selected: Colour[]): Colour[] {
    const out = [...selected];
    if (out[0].r < 16) {
      out[0] = out[0].darken(0.4);
    }

    out[7] = out[7].blend(LIGHT_GREY);
    out[8] = out[7].darken(0.3);
    out[15] = out[15].blend(LIGHT_GREY);

    return out;
  }
}
