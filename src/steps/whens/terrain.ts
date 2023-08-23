import { When } from "@cucumber/cucumber";

import { api } from "../../api.js";
import { BookOfHoursWorld } from "../../world.js";

When(
  /^I open the terrain unlock window for (\S+)$/,
  async (terrainId: string) => {
    await api.openTokenAtPath(`~/library!${terrainId}`);
  }
);

When(
  /^I execute the terrain unlock window for (\S+)$/,
  async function (this: BookOfHoursWorld, terrainId: string) {
    const { executedRecipeId, timeRemaining } = await api.executeTokenAtPath(
      `~/library!${terrainId}`
    );
    this.startedRecipeId = executedRecipeId;
    this.startedRecipeTimeRemaining = timeRemaining;
  }
);

When(
  /^I drag the (\S+) card to the terrain unlock window for (\S+)$/,
  async (elementId: string, terrainId: string) => {
    const tokens = await api.getElementStacksInHand();
    const element = tokens.find((x) => x.elementId === elementId);
    if (!element) {
      throw new Error(`The ${elementId} card is not in the player's hand.`);
    }

    await api.updateTokenAtPath(element.path, {
      spherePath: "~/terraindetailinputsphere",
    });
  }
);
