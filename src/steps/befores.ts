import { Before } from "@cucumber/cucumber";

import { api } from "../api.js";

Before(async () => {
  await api.setSpeed("Paused");
});
