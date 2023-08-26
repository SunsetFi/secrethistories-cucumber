import { Given } from "@cucumber/cucumber";
import HttpStatusCodes from "http-status-codes";

import { api, throwForStatus } from "../../api.js";

Given(/^I have a(?:n?) (\S+) tabletop verb$/, async (verbId: string) => {
  try {
    await api.createSituationAtPath("~/tabletop", {
      verbId,
    });
  } catch (err: any) {
    throwForStatus(err, {
      [HttpStatusCodes.NOT_FOUND]: `Could not find the tabletop sphere.`,
      [HttpStatusCodes.BAD_REQUEST]: `Cannot create a situation from verb id ${verbId} as the verb does not exist.`,
    });

    throw err;
  }
});

Given(
  /^I have a(?:n?) (\S+) tabletop verb with recipe (\S+)$/,
  async (verbId: string, recipeId: string) => {
    try {
      await api.createSituationAtPath("~/tabletop", {
        verbId,
        recipeId,
      });
    } catch (err: any) {
      throwForStatus(err, {
        [HttpStatusCodes.NOT_FOUND]: `Could not find the tabletop sphere.`,
        [HttpStatusCodes.BAD_REQUEST]: `Cannot create a situation from verb id ${verbId} as the verb does not exist.`,
      });

      throw err;
    }
  }
);
