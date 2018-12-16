import { readFile as readFileAsync } from "fs";
import { promisify } from "util";
import { Image as IImage } from "./types";

const readFile = promisify(readFileAsync);

export class LocalImage implements IImage {
  path: string;
  buffer?: Buffer;

  constructor(filePath: string) {
    this.path = filePath;
  }

  async toBuffer(bypassCache: boolean = false): Promise<Buffer> {
    if (bypassCache || !this.buffer) {
      this.buffer = await readFile(this.path);
    }
    return this.buffer;
  }
}
