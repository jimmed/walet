import * as innerWhich from "which";
import { promisify } from "util";

const whichAsync = promisify(innerWhich);

export const which = async (path: string): Promise<string | null> => {
  try {
    return await whichAsync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};
