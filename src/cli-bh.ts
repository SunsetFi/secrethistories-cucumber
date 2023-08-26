#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";

import { runCli } from "./cli-factory";

const dirName = path.dirname(fileURLToPath(import.meta.url));

runCli({
  support: {
    importPaths: [path.join(dirName, "steps-bh", "**", "*.js")],
  },
});
