import assert from "assert";
import { DataTable, Then } from "@cucumber/cucumber";

import { api } from "../../../api.js";
import { aspectsMatch, combineAspects } from "secrethistories-api";
import { aspectsFromTable } from "../../../utils.js";

Then(
  /^the (\S+) tabletop verb should have (\d+(?:\.\d+)?) second(?:s?) remaining$/,
  async (verbId: string, seconds: string) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    assert.equal(situation.timeRemaining, Number(seconds));
  }
);

Then(
  /^the (\S+) tabletop verb should be completed$/,
  async (verbId: string) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    assert.equal(situation.state, "Complete");
  }
);

Then(
  /^the (\S+) tabletop verb should be on the (\S+) recipe$/,
  async (verbId: string, recipeId: string) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    assert.equal(situation.currentRecipeId, recipeId);
  }
);

Then(
  /^the (\S+) tabletop verb should contain a(?:n?) (\S+) card$/,
  async (verbId: string, elementId: string) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    if (
      !tokens.find(
        (x) => x.payloadType === "ElementStack" && x.elementId === elementId
      )
    )
      throw new Error(
        `The ${verbId} verb does not contain a ${elementId} card.`
      );
  }
);

Then(
  /^the (\S+) tabletop verb should contain a card with the following aspects:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    const aspects = aspectsFromTable(dataTable);

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

    throw new Error(
      `No card in the ${verbId} verb storage matched the aspects.`
    );
  }
);

Then(
  /^the (\S+) tabletop verb should not contain a card with the following aspects:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    const aspects = aspectsFromTable(dataTable);

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
        throw new Error(
          `The ${verbId} verb contained a ${token.elementId} card with the aspects when it should not.`
        );
      }
    }
  }
);

Then(
  /^the (\S+) tabletop verb should not contain a(?:n?) (\S+) card$/,
  async (verbId: string, elementId: string) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    if (
      tokens.find(
        (x) => x.payloadType === "ElementStack" && x.elementId === elementId
      )
    )
      throw new Error(
        `The ${verbId} verb contained a ${elementId} card when it should not.`
      );
  }
);

Then(
  /^the (\S+) tabletop verb should contain the following output:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
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
  /^the (\S+) tabletop verb should not contain the following output:$/,
  async (verbId: string, dataTable: DataTable) => {
    const situation = await api.getTabletopVerb(verbId);
    if (!situation) {
      throw new Error(`The ${verbId} tabletop verb does not exist.`);
    }

    const tokens = await api.getSituationOutputTokens(situation);

    for (const item of dataTable.hashes()) {
      const { elementId } = item;
      for (const token of tokens) {
        if (
          token.payloadType === "ElementStack" &&
          token.elementId === elementId
        ) {
          throw new Error(
            `The ${verbId} verb contained a ${elementId} card when it should not.`
          );
        }
      }
    }
  }
);
