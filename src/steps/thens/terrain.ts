import { Then } from "@cucumber/cucumber";

import { api } from "../../api.js";
import assert from "assert";

Then(/^the (\S+) terrain should be unlocked$/, async (terrainId: string) => {
  const terrain = await api.getTokenAtPath(`~/library/!${terrainId}`);
  if (!terrain) {
    throw new Error(`The ${terrainId} terrain could not be found.`);
  }
  // FIXME: typings in lib
  assert.strictEqual((terrain as any).shrouded, false);
});
