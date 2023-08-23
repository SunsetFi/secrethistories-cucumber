import { Given } from "@cucumber/cucumber";

import { api } from "../../api.js";

Given(/^the (\S+) terrain is unlocked$/, async (terrainId: string) => {
  await api.unlockTokenAtPath(`~/library/!${terrainId}`);
});
