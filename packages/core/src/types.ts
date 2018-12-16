export * from "./image/types";
export * from "./colour/types";

import { ImageSource } from "./image/types";
import { Colour } from "./colour/Colour";

export interface ColourSchemeBackend {
  generate(buffer: Buffer, light?: boolean): Promise<ColourScheme>;
}

export interface ColourScheme {
  light: boolean;
  colours: Colour[];
}

export interface Theme {
  image: ImageSource;
  colours: ColourScheme;
}
