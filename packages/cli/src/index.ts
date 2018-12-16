import {
  WalColourSchemeBackend,
  VibrantColourSchemeBackend
} from "@walet/core";
import { runCli } from "./cli";
import * as yargs from "yargs";

const backends = {
  wal: WalColourSchemeBackend,
  vibrant: VibrantColourSchemeBackend
};

const { argv } = yargs(process.argv).command({
  command: ["generate", "$0"],
  describe: "Generate a colour scheme from an image",
  builder: (yargs: yargs.Argv) =>
    yargs
      .option("image", {
        alias: ["i", "url", "path"],
        type: "string",
        describe: "The URL or path of the image"
      })
      .option("light", {
        alias: ["l"],
        type: "boolean",
        default: false,
        describe: "Generate a light theme (instead of dark)"
      })
      .option("backend", {
        alias: ["b"],
        type: "string",
        choices: Object.keys(backends),
        default: "vibrant"
      })
      .demandOption("image"),
  handler: ({ image, light, backend }: yargs.Arguments) => {
    runCli(image, light, new backends[backend]());
  }
});
