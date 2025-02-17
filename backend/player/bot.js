const { sample, pull, times } = require("lodash");

const Player = require("./index");
const logger = require("../logger");

module.exports = class Bot extends Player {
  constructor(picksPerPack, burnsPerPack, firstPackPicks, gameId) {
    super({
      isBot: true,
      isConnected: true,
      name: "bot",
      id: "",
    });
    this.gameId = gameId;
    this.picksPerPack = picksPerPack;
    this.burnsPerPack = burnsPerPack;
    this.firstPackPicks = firstPackPicks;
  }

  getPack(pack) {
    this.pickNumber++;
    const cardsToPick =
      this.pickNumber === 1
        ? this.firstPackPicks
        : Math.min(this.picksPerPack, pack.length);
    times(cardsToPick, () => {
      const randomPick = sample(pack);
      logger.info(`GameID: ${this.gameId}, Bot, picked: ${randomPick.name}`);
      this.picks.push(randomPick.name);
      pull(pack, randomPick);
    });

    // burn cards
    const cardsToBurn = Math.min(this.burnsPerPack, pack.length);
    times(cardsToBurn, () => {
      const randomPick = sample(pack);
      logger.info(`GameID: ${this.gameId}, Bot, burnt: ${randomPick.name}`);
      pull(pack, randomPick);
    });

    this.emit("pass", pack);
  }
};
