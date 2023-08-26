import { fileURLToPath } from "url";
import path from "path";
import minimist from "minimist";
import lodash from "lodash";

import {
  IRunConfiguration,
  loadConfiguration,
  runCucumber,
} from "@cucumber/cucumber/api";

import "source-map-support/register.js";

import { DeepPartial } from "./types";

export function runCli(config: DeepPartial<IRunConfiguration>) {
  const dirName = path.dirname(fileURLToPath(import.meta.url));

  const argv = minimist(process.argv.slice(2));

  const names: string[] =
    argv["name"] && Array.isArray(argv["name"]) ? argv["name"] : [argv["name"]];

  async function run() {
    const { runConfiguration: loadedRunConfig } = await loadConfiguration();
    const runConfiguration: IRunConfiguration = lodash.merge(
      loadedRunConfig,
      {
        sources: {
          names: names ?? loadedRunConfig.sources.names,
          paths: ["./**/*.feature"],
        },
        support: {
          importPaths: [
            path.join(dirName, "bootstrap.js"),
            path.join(dirName, "steps", "**", "*.js"),
          ],
        },
      },
      config
    );

    const result = await runCucumber(runConfiguration);

    if (!result.success) {
      process.exit(1);
    }
  }

  run();
}
