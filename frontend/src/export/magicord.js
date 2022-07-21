import { ZONE_MAIN, ZONE_SIDEBOARD } from "../zones";
import aes from "crypto-js/aes";

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
    "",
    "Sideboard",
    ...deck[ZONE_SIDEBOARD].map(renderCopyCard),
  ].join("\n");
  return btoa(result);
}

function renderCopyCard({ count, card }) {
  return `${count} ${card.uuid}`;
}
