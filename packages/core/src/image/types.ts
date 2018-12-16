export interface Image {
  toBuffer(): Promise<Buffer>;
}

export enum ImageSource {
  MEMORY,
  FILE,
  WEB
}
