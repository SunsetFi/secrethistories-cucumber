import { DataTable, Then } from "@cucumber/cucumber";
import assert from "assert";
import { aspectsMatch, combineAspects } from "secrethistories-api";

import { api } from "../../api.js";
import { aspectsFromTable } from "../../utils.js";

Then(/^I should have the following cards:$/, async (dataTable: DataTable) => {
  const tokens = await api.getElementStacksInHand();
  for (const item of dataTable.hashes()) {
    const { elementId, quantity = 1 } = item;

    let count = 0;
    for (var token of tokens) {
      if (
        token.payloadType === "ElementStack" &&
        token.elementId === elementId
      ) {
        count += token.quantity;
      }
    }
    assert.equal(count, Number(quantity));
  }
});

Then(
  /^I should not have the following cards:$/,
  async (dataTable: DataTable) => {
    const tokens = await api.getElementStacksInHand();
    for (const item of dataTable.hashes()) {
      const { elementId, quantity = 1 } = item;

      for (var token of tokens) {
        if (
          token.payloadType === "ElementStack" &&
          token.elementId === elementId
        ) {
          throw new Error(
            `The ${elementId} card should not be in the player's hand.`
          );
        }
      }
    }
  }
);

Then(
  /^I should have a(?:n?) (\S+) card with the following aspects:$/,
  async (elementId: string, dataTable: DataTable) => {
    const tokens = await api.getElementStacksInHand();

    const aspects = aspectsFromTable(dataTable);

    for (const token of tokens) {
      if (token.payloadType != "ElementStack") {
        continue;
      }

      if (
        token.elementId === elementId &&
        aspectsMatch(
          combineAspects(token.elementAspects, token.mutations),
          aspects
        )
      ) {
        return;
      }
    }

    throw new Error(
      `The ${elementId} element does not have the correct aspects.`
    );
  }
);
