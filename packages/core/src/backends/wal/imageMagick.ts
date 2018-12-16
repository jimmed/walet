import { which } from "./which";

export const getImageMagick = async () => {
  if (await which("magick")) {
    return ["magick", "convert"];
  }
  if (await which("convert")) {
    return ["convert"];
  }
  throw new Error("ImageMagick does not appear to be installed.");
};
