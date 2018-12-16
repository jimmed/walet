import { ImageSource } from "./image/types";
import { Colour } from "./colour/Colour";

export interface ColourScheme {
  light: boolean;
  colours: Colour[];
}

export interface Theme {
  image: ImageSource;
  colours: ColourScheme;
}
