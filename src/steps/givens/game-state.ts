import { Given } from "@cucumber/cucumber";
import { LegacyId } from "secrethistories-api";

import { api } from "../../api.js";
import { BookOfHoursWorld } from "../../world.js";
import { loadingTimeout } from "../../timeouts.js";

const checkpoints = new Map<string, any>();

Given(
  /^I start a new (\S+) legacy$/,
  { timeout: loadingTimeout },
  async (legacyId: LegacyId) => {
    await api.startLegacy(legacyId);
  }
);

Given(
  /^I make a new checkpoint called (\S+)$/,
  { timeout: loadingTimeout },
  async function (this: BookOfHoursWorld, checkpointId: string) {
    const { gameState } = await api.getGameState();
    checkpoints.set(checkpointId, gameState);
  }
);

Given(
  /^I load the (\S+) checkpoint$/,
  { timeout: loadingTimeout },
  async function (this: BookOfHoursWorld, checkpointId: string) {
    const checkpoint = checkpoints.get(checkpointId);
    if (!checkpoint) {
      throw new Error(`Checkpoint ${checkpointId} does not exist`);
    }

    await api.setGameState(checkpoint);
  }
);
