import { ColourScheme } from "../types";

export interface ColourSchemeBackend {
  generate(buffer: Buffer, light?: boolean): Promise<ColourScheme>;
}
