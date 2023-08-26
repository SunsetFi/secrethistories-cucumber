import assert from "assert";

import { api } from "../../../api.js";

import { DataTable, Then } from "@cucumber/cucumber";

Then(
  /^the (\S+) brancrug building should have (\d+(?:\.\d+)?) second(?:s?) remaining$/,
  async (buildingId: string, seconds: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    assert.equal(situation.timeRemaining, Number(seconds));
  }
);

Then(
  /^the (\S+) brancrug building should be completed$/,
  async (buildingId: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    assert.equal(situation.state, "Complete");
  }
);

Then(
  /^the (\S+) brancrug building should be on the (\S+) recipe$/,
  async (buildingId: string, recipeId: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    assert.equal(situation.currentRecipeId, recipeId);
  }
);

Then(
  /^the (\S+) brancrug building should contain a(?:n?) (\S+) card$/,
  async (buildingId: string, elementId: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    if (
      !tokens.find(
        (x) => x.payloadType === "ElementStack" && x.elementId === elementId
      )
    )
      throw new Error(
        `The ${buildingId} building does not contain a ${elementId} card.`
      );
  }
);

Then(
  /^the (\S+) brancrug building should not contain a(?:n?) (\S+) card$/,
  async (buildingId: string, elementId: string) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
    }

    const tokens = await api.getSituationStorageTokens(situation);

    if (
      tokens.find(
        (x) => x.payloadType === "ElementStack" && x.elementId === elementId
      )
    )
      throw new Error(
        `The ${buildingId} building contained a ${elementId} card when it should not.`
      );
  }
);

Then(
  /^the (\S+) brancrug building should contain the following output:$/,
  async (buildingId: string, dataTable: DataTable) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
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
  /^the (\S+) brancrug building should not contain the following output:$/,
  async (buildingId: string, dataTable: DataTable) => {
    const situation = await api.getBrancrugSituation(buildingId);
    if (!situation) {
      throw new Error(`The ${buildingId} building does not exist.`);
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
            `The ${buildingId} building contained a ${elementId} card when it should not.`
          );
        }
      }
    }
  }
);
