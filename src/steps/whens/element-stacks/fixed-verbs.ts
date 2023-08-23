import { When } from "@cucumber/cucumber";
import HttpStatusCodes from "http-status-codes";

import { api, throwForStatus } from "../../../api.js";

When(
  /^I drag the (\S+) card to the (\S+) fixed verb (\S+) slot$/,
  async (elementId: string, verbId: string, slotId: string) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    const elements = await api.getElementStacksInHand();
    const element = elements.find((x) => x.elementId === elementId);
    if (!element) {
      throw new Error(`The ${elementId} card is not in the player's hand.`);
    }

    await api.putElementInSituationThreshold(element, situation, slotId);
  }
);
