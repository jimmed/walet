import { ColourSchemeBackend } from "../types";
import { ColourScheme } from "../../types";
import { Colour } from "../../colour";

// TypeScript doesn't like this module written in TypeScript.
const Vibrant = require("node-vibrant");

export class VibrantColourSchemeBackend implements ColourSchemeBackend {
  async generate(
    buffer: Buffer,
    light: boolean = false
  ): Promise<ColourScheme> {
    const palette = await Vibrant.from(buffer).getPalette();

    const bgColour = light
      ? Colour.fromRgbObject(palette.LightVibrant)
          .saturate(0.5)
          .lighten(0.85)
      : Colour.fromRgbObject(palette.DarkMuted).darken(0.85);

    return {
      light,
      colours: [
        !light && bgColour.r < 16 ? bgColour.darken(0.4) : bgColour,
        ...Object.values(palette).map(Colour.fromRgbObject, Colour)
      ]
    };
  }
}
