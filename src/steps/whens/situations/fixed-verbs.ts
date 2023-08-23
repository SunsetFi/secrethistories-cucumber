import { When } from "@cucumber/cucumber";

import { BookOfHoursWorld } from "../../../world.js";
import { api } from "../../../api.js";

When(
  /^I start the (\S+) fixed verb$/,
  async function (this: BookOfHoursWorld, verbId: string) {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    const { executedRecipeId, timeRemaining } = await api.executeTokenAtPath(
      situation.path
    );
    this.startedRecipeId = executedRecipeId;
    this.startedRecipeTimeRemaining = timeRemaining;
  }
);
