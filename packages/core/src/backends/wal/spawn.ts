import { spawn as spawnProcess } from "child_process";

export const spawn = async (
  command: string,
  cmdArgs: string[],
  stdin: Buffer
): Promise<string> =>
  new Promise((resolve, reject) => {
    const stdout = [];
    const stderr = [];

    const process = spawnProcess(command, cmdArgs);
    process.on("error", reject).on("close", errorCode => {
      if (errorCode) {
        reject(stderr.join(""));
      } else {
        resolve(stdout.join(""));
      }
    });

    process.stdout.on("data", chunk => stdout.push(chunk));
    process.stderr.on("data", chunk => stderr.push(chunk));

    process.stdin.write(stdin)
    process.stdin.end();
  });
