import { When } from "@cucumber/cucumber";

import { api } from "../../api.js";
import { GetSituationResponse, Situation } from "bookofhours-api";

When(/^(\d+(?:\.\d+)?) seconds have elapsed$/, async (seconds: string) => {
  await api.passTime(Number(seconds));
});

When(/^the next day arrives$/, async () => {
  let dayToken: Situation;
  const dayTokens = await api.getSituationsAtPath(`~/day`);
  if (dayTokens.length !== 1) {
    throw new Error(
      `Expected exactly one day token, but found ${dayTokens.length}`
    );
  }
  dayToken = dayTokens[0];
  do {
    const timeRemaining = dayToken.timeRemaining;
    await api.passTime(timeRemaining);

    const dayTokens = await api.getSituationsAtPath(`~/day`);
    if (dayTokens.length !== 1) {
      throw new Error(
        `Expected exactly one day token, but found ${dayTokens.length}`
      );
    }
    dayToken = dayTokens[0];
  } while (dayToken.recipeId !== "day.dawn");

  // Day cycle seems to unpause.
  await api.setSpeed("Paused");
});
