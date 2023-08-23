import assert from "assert";
import { aspectsMatch, combineAspects } from "bookofhours-api";

import { DataTable, Then } from "@cucumber/cucumber";
import { api } from "../../../api.js";

Then(/^the (\S+) fixed verb should be available$/, async (verbId: string) => {
  const situation = await api.getFixedVerb(verbId);
  if (!situation) {
    throw new Error(`The ${verbId} fixed verb does not exist.`);
  }
});

Then(
  /^the (\S+) fixed verb should have (\d+(?:\.\d+)?) second(?:s?) remaining$/,
  async (verbId: string, seconds: string) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    assert.equal(situation.timeRemaining, Number(seconds));
  }
);

Then(/^the (\S+) fixed verb should be completed$/, async (verbId: string) => {
  const situation = await api.getFixedVerb(verbId);
  if (!situation) {
    throw new Error(`The ${verbId} fixed verb does not exist.`);
  }

  assert.equal(situation.state, "Complete");
});

Then(
  /^the (\S+) fixed verb should be on the (\S+) recipe$/,
  async (verbId: string, recipeId: string) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    assert.equal(situation.currentRecipeId, recipeId);
  }
);

Then(
  /^the (\S+) fixed verb should contain the following output:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    const tokens = await api.getSituationOutputTokens(situation);

    for (const item of dataTable.hashes()) {
      const { elementId, quantity } = item;
      let count = 0;
      for (const token of tokens) {
        if (
          token.payloadType === "ElementStack" &&
          token.elementId === elementId
        ) {
          count += token.quantity;
        }
      }

      assert.equal(count, Number(quantity));
    }
  }
);

Then(
  /^the (\S+) fixed verb should contain an output card with the following aspects:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    const tokens = await api.getSituationOutputTokens(situation);

    const reqs = dataTable.hashes();
    const aspects = reqs.reduce((obj, req) => {
      obj[req.aspect] = Number(req.amount);
      return obj;
    }, {} as Record<string, number>);

    for (const token of tokens) {
      if (token.payloadType != "ElementStack") {
        continue;
      }

      if (
        aspectsMatch(
          combineAspects(token.elementAspects, token.mutations),
          aspects
        )
      ) {
        return;
      }
    }

    throw new Error("No card in the sphere matched the aspects.");
  }
);

Then(
  /^the (\S+) fixed verb should contain a(?:n?) (\S+) output card with the following aspects:$/,
  async (verbId: string, elementId: string, dataTable: DataTable) => {
    const situation = await api.getFixedVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} fixed verb does not exist.`);
    }

    const tokens = await api.getSituationOutputTokens(situation);

    const reqs = dataTable.hashes();
    const aspects = reqs.reduce((obj, req) => {
      obj[req.aspect] = Number(req.amount);
      return obj;
    }, {} as Record<string, number>);

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
      `The ${verbId} fixed verb does not contain a ${elementId} card with the correct aspects.`
    );
  }
);
