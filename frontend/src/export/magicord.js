import { ZONE_MAIN, ZONE_SIDEBOARD } from "../zones";

export default {
  name: "Magicord",
  download: text,
  downloadExtension: ".txt",
  copy: text,
};

function text(name, deck) {
  const result = [
    "Deck",
    ...deck[ZONE_MAIN].map(renderCopyCard),
    "Sideboard",
    ...deck[ZONE_SIDEBOARD].map(renderCopyCard),
  ].join("|");
  return result;
}

function renderCopyCard({ card, amountFoil, amountNonFoil }) {
  return `${card.uuid}.${amountFoil}.${amountNonFoil}`;
}
