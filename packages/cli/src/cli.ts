import { parse as parseUrl } from "url";
import { resolve as resolvePath } from "path";
import { ColourSchemeBackend, ColourScheme } from "@walet/core";
import fetch from "node-fetch";
import { readFile as readFileAsync } from "fs";
import { promisify } from "util";
import chalk from "chalk";

const readFile = promisify(readFileAsync);

export const bufferFromUrl = async (url: string) => {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type");
  if (contentType && !contentType.startsWith("image")) {
    console.warn(
      `This URL returned a Content-Type header of "${contentType}", which does not appear to be an image`
    );
  }
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} (${response.statusText})`);
  }
  return Buffer.from(await response.arrayBuffer());
};

export const bufferFromPath = async (path: string) => {
  return readFile(resolvePath(process.cwd(), path));
};

export const bufferFromUrlOrPath = async (urlOrPath: string) => {
  const url = parseUrl(urlOrPath);
  return url.protocol ? bufferFromUrl(urlOrPath) : bufferFromPath(urlOrPath);
};

export const generateScheme = async (
  urlOrPath: string,
  light: boolean,
  backend: ColourSchemeBackend
) => {
  const buffer = await bufferFromUrlOrPath(urlOrPath);
  return backend.generate(buffer, light);
};

export const renderResult = ({ colours }: ColourScheme): string => {
  return colours
    .map(c => c.toHex())
    .map(hex => chalk.bgHex(hex)("  ") + " " + hex)
    .join("\n");
};

export const runCli = async (
  urlOrPath: string,
  light: boolean,
  backend: ColourSchemeBackend
) => {
  try {
    const result = await generateScheme(urlOrPath, light, backend);
    console.log(renderResult(result));
  } catch (error) {
    console.error("It went wrong!");
    console.error(error);
  }
};
