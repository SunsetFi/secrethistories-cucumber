#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";

import { runCli } from "./cli-factory.js";

const dirName = path.dirname(fileURLToPath(import.meta.url));

runCli({
  support: {
    importPaths: [path.join(dirName, "steps-cs", "**", "*.js")],
  },
});
