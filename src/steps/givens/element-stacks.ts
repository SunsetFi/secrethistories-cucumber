import { Given } from "@cucumber/cucumber";
import HttpStatusCodes from "http-status-codes";

import { api, throwForStatus } from "../../api.js";

Given(
  /^I have a(?:n?) (\S+) card on the (\S+) sphere$/,
  async (elementId: string, spherePath: string) => {
    try {
      await api.createElementStackAtPath(spherePath, {
        elementId,
        quantity: 1,
      });
    } catch (err: any) {
      throwForStatus(err, {
        [HttpStatusCodes.NOT_FOUND]: `Sphere ${spherePath} does not exist.`,
        [HttpStatusCodes.BAD_REQUEST]: `The element ${elementId} could not be created.`,
      });

      throw err;
    }
  }
);

Given(
  /^I have (\d+) (\S+) cards on the (\S+) sphere$/,
  async (quantity: number, elementId: string, spherePath: string) => {
    try {
      await api.createElementStackAtPath(spherePath, {
        elementId,
        quantity: Number(quantity),
      });
    } catch (err: any) {
      throwForStatus(err, {
        [HttpStatusCodes.NOT_FOUND]: `Sphere ${spherePath} does not exist.`,
        [HttpStatusCodes.BAD_REQUEST]: `The element ${elementId} could not be created.`,
      });

      throw err;
    }
  }
);
