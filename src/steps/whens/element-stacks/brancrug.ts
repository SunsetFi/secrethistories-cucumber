import { DataTable, When } from "@cucumber/cucumber";

import { api } from "../../../api.js";
import { aspectsMatch, combineAspects } from "bookofhours-api";

When(
  /^I drag the (\S+) card to the (\S+) brancrug building (\S+) slot$/,
  async (elementId: string, buildingId: string, slotId: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    const elements = await api.getElementStacksInHand();
    const element = elements.find((x) => x.elementId === elementId);
    if (!element) {
      throw new Error(`The ${elementId} card is not in the player's hand.`);
    }

    await api.putElementInSituationThreshold(element, situation, slotId);
  }
);

When(
  /^I drag a card to the (\S+) brancrug building (\S+) slot with the following aspects:$/,
  async (buildingId: string, slotId: string, dataTable: DataTable) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    const elements = await api.getElementStacksInHand();

    const reqs = dataTable.hashes();
    const aspects = reqs.reduce((obj, req) => {
      obj[req.aspect] = Number(req.amount);
      return obj;
    }, {} as Record<string, number>);

    const element = elements.find((x) =>
      aspectsMatch(combineAspects(x.elementAspects, x.mutations), aspects)
    );
    if (!element) {
      throw new Error(`No card in the player's hand matched the aspects.`);
    }

    await api.putElementInSituationThreshold(element, situation, slotId);
  }
);
