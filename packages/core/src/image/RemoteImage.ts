import fetch from "node-fetch";
import { Buffer } from "buffer";
import { Image as IImage } from "./types";

export class RemoteImage implements IImage {
  url: string;
  buffer?: Buffer;
  inflightRequest?: Promise<ArrayBuffer>;

  constructor(url: string) {
    this.url = url;
  }

  async toBuffer(bypassCache: boolean = false): Promise<Buffer> {
    if (bypassCache || !this.buffer) {
      if (bypassCache || !this.inflightRequest) {
        this.inflightRequest = fetch(this.url).then(res => res.arrayBuffer());
      }
      const arrayBuffer = await this.inflightRequest;
      this.buffer = Buffer.from(arrayBuffer);
    }
    return this.buffer;
  }
}
