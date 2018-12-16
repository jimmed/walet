import { Image as IImage } from "./types";

export class InMemoryImage implements IImage {
  buffer: Buffer;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  async toBuffer(): Promise<Buffer> {
    return this.buffer;
  }
}
