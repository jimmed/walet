import { WalColourSchemeBackend } from "@walet/core";
import { runCli } from "./cli";

const backend = new WalColourSchemeBackend();

const { argv } = process;

const [urlOrPath] = argv.slice(-1);

const light = ["-l", "--light"].some(x => argv.includes(x));

runCli(urlOrPath, light, backend);
