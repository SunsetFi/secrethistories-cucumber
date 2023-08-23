import { When } from "@cucumber/cucumber";

import { api } from "../../../api.js";

When(
  /^I drag the (\S+) card from the (\S+) sphere to the (\S+) sphere$/,
  async (elementId: string, fromSpherePath: string, toSpherePath: string) => {
    const tokens = await api.getTokensAtPath(fromSpherePath);
    const element = tokens.find(
      (x) => x.payloadType === "ElementStack" && x.elementId === elementId
    );
    if (!element) {
      throw new Error(
        `The ${elementId} card is not in the ${fromSpherePath} sphere.`
      );
    }

    await api.updateTokenAtPath(element.path, {
      spherePath: toSpherePath,
    });
  }
);
