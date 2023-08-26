import { Given } from "@cucumber/cucumber";
import HttpStatusCodes from "http-status-codes";

import { api, throwForStatus } from "../../api.js";

Given(
  /^I have a(?:n?) (\S+) verb in the (\S+) sphere$/,
  async (verbId: string, spherePath: string) => {
    try {
      await api.createSituationAtPath(spherePath, {
        verbId,
      });
    } catch (err: any) {
      throwForStatus(err, {
        [HttpStatusCodes.NOT_FOUND]: `Sphere ${spherePath} does not exist.`,
        [HttpStatusCodes.BAD_REQUEST]: `Cannot create a situation from verb id ${verbId} as the verb does not exist.`,
      });

      throw err;
    }
  }
);

Given(
  /^I have a(?:n?) (\S+) verb in the (\S+) sphere with the recipe (\S+)$/,
  async (verbId: string, spherePath: string, recipeId: string) => {
    try {
      await api.createSituationAtPath(spherePath, {
        verbId,
        recipeId,
      });
    } catch (err: any) {
      throwForStatus(err, {
        [HttpStatusCodes.NOT_FOUND]: `Sphere ${spherePath} does not exist.`,
        [HttpStatusCodes.BAD_REQUEST]: `Either the verb id ${verbId} does not exist, the recipe ${recipeId} does not exist, or the recipe ${recipeId} does not target the ${verbId} verb.`,
      });

      throw err;
    }
  }
);

Given("all situations are concluded", async () => {
  const situations = [
    ...(await api.getFixedVerbs()),
    ...(await api.getBrancrugSituations()),
  ];

  await Promise.all(
    situations
      .filter((x) => x.state === "Complete")
      .map((x) => api.concludeTokenAtPath(x.path))
  );
});
