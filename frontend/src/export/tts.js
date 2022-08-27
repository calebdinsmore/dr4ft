import { ZONE_MAIN, ZONE_SIDEBOARD } from "../zones";

const CARD_BACK = "https://i.imgur.com/VuVeL4u.png";

export default {
  name: "TTS",
  download: text,
  downloadExtension: ".json",
  copy: text,
};

function text(name, deck) {
  // const result = [
  //   "Deck",
  //   ...deck[ZONE_MAIN].map(renderCopyCard),
  //   "Sideboard",
  //   ...deck[ZONE_SIDEBOARD].map(renderCopyCard),
  // ].join("|");
  // return result;
  let ObjectStates = [
    buildObjectState(deck[ZONE_MAIN], 0, false),
    buildObjectState(deck[ZONE_MAIN], 4, true),
    buildObjectState(deck[ZONE_SIDEBOARD], 8, false),
    buildObjectState(deck[ZONE_SIDEBOARD], 12, true),
  ];
  ObjectStates = ObjectStates.filter((x) => x !== null);
  return JSON.stringify({ ObjectStates });
}

function buildObjectState(zone, deckPos = 0, isTransform = false) {
  const cardMap = {};
  const ContainedObjects = [];
  const CustomDeck = {};
  const DeckIDs = [];
  let cardId = 100;
  for (let { card, count } of zone) {
    if (isTransform && !card.flippedIsBack) {
      continue;
    }

    if (!cardMap[card.name]) {
      cardMap[card.name] = { id: cardId, card };
      cardId += 100;
    }

    for (let i = 0; i < count; i++) {
      DeckIDs.push(cardMap[card.name].id);
      ContainedObjects.push({
        CardID: cardMap[card.name].id,
        Name: "Card",
        Nickname: card.name,
        Transform: {
          posX: 0,
          posY: 0,
          posZ: 0,
          rotX: 0,
          rotY: 180,
          rotZ: 180,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
      });
    }
  }

  for (let cardName in cardMap) {
    const idKey = `${cardMap[cardName].id / 100}`;
    const card = cardMap[cardName].card;
    CustomDeck[idKey] = {
      FaceURL: card.url,
      BackURL: isTransform ? card.flippedCardURL : CARD_BACK,
      NumHeight: 1,
      NumWidth: 1,
      BackIsHidden: true,
    };
  }

  DeckIDs.sort();
  ContainedObjects.sort((a, b) => {
    if (a.CardID > b.CardID) return 1;
    else if (a.CardID === b.CardID) return 0;
    else return -1;
  });
  const Transform = {
    posX: deckPos,
    posY: 1,
    posZ: 0,
    rotX: 0,
    rotY: 180,
    rotZ: 180,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  };

  if (ContainedObjects.length > 1) {
    return {
      Name: "DeckCustom",
      ContainedObjects,
      DeckIDs,
      CustomDeck,
      Transform,
    };
  } else if (ContainedObjects.length === 1) {
    return {
      Name: "Card",
      CardID: ContainedObjects[0].CardID,
      Nickname: ContainedObjects[0].Nickname,
      CustomDeck,
      Transform,
    };
  }

  return null;
}
