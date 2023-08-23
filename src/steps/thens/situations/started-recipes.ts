import { Then } from "@cucumber/cucumber";
import assert from "assert";

import { BookOfHoursWorld } from "../../../world.js";

Then(
  /^the started recipe should be (\S+)$/,
  async function (this: BookOfHoursWorld, expectedRecipeId: string) {
    assert.strictEqual(this.startedRecipeId, expectedRecipeId);
  }
);

Then(
  /^the started recipe should have ((?:\d+)(?:\.\d+)?) seconds remaining$/,
  async function (this: BookOfHoursWorld, timeRemaining: string) {
    assert.strictEqual(this.startedRecipeTimeRemaining, Number(timeRemaining));
  }
);
