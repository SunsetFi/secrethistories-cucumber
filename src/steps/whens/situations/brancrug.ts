import { When } from "@cucumber/cucumber";

import { BookOfHoursWorld } from "../../../world.js";
import { api } from "../../../api.js";

When(
  /^I start the (\S+) brancrug building verb$/,
  async function (this: BookOfHoursWorld, buildingId: string) {
    const sphere = await api.getBrancrugSituation(buildingId);
    if (!sphere) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    const { executedRecipeId, timeRemaining } = await api.executeTokenAtPath(
      sphere.path
    );
    this.startedRecipeId = executedRecipeId;
    this.startedRecipeTimeRemaining = timeRemaining;
  }
);
